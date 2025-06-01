import 'dotenv/config';
import { google } from 'googleapis';
import axios from 'axios';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  //refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Function to get the most recent email
async function getLatestEmail() {
  const res = await gmail.users.messages.list({ userId: 'me', maxResults: 1, q: 'is:inbox' });
  const messages = res.data.messages;
  if (!messages || messages.length === 0) throw new Error('No emails found.');
  const msg = await gmail.users.messages.get({ userId: 'me', id: messages[0].id! });
  return msg.data;
}

// Function to extract plain text from the email payload
function extractPlainText(payload: any): string {
  if (!payload) return '';
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body && part.body.data) {
        return Buffer.from(part.body.data, 'base64').toString('utf-8');
      }
    }
  }
  if (payload.body && payload.body.data) {
    return Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }
  return '';
}

// Function to generate a reply using OpenRouter.ai
async function generateReply(emailText: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not set in .env');

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an assistant that replies to emails in a helpful and professional manner.' },
        { role: 'user', content: `Reply to this email:\n\n${emailText}` }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data.choices[0].message.content.trim();
}

// Function to send a reply email
async function sendReply(originalEmail: any, replyText: string) {
  const headers = originalEmail.payload.headers;
  const toHeader = headers.find((h: any) => h.name === 'From');
  const subjectHeader = headers.find((h: any) => h.name === 'Subject');
  const messageIdHeader = headers.find((h: any) => h.name === 'Message-ID');

  const to = toHeader ? toHeader.value : '';
  const subject = subjectHeader ? subjectHeader.value : '';
  const messageId = messageIdHeader ? messageIdHeader.value : '';

  const replySubject = subject.startsWith('Re:') ? subject : `Re: ${subject}`;

  const rawMessage =
    `From: me\r\n` +
    `To: ${to}\r\n` +
    `Subject: ${replySubject}\r\n` +
    `In-Reply-To: ${messageId}\r\n` +
    `References: ${messageId}\r\n` +
    `Content-Type: text/plain; charset="UTF-8"\r\n\r\n` +
    `${replyText}`;

  const encodedMessage = Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
      threadId: originalEmail.threadId,
    },
  });
}

async function createCalendarEvent(eventDetails: { summary: string, start: string, end: string }) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const event = {
    summary: eventDetails.summary,
    start: { dateTime: eventDetails.start, timeZone: 'UTC' },
    end: { dateTime: eventDetails.end, timeZone: 'UTC' },
  };
  const res = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
  });
  return res.data;
}

// Modify your generateReply function to also extract event details
async function generateReplyAndEvent(emailText: string): Promise<{ reply: string, event?: any }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not set in .env');

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an assistant that replies to emails and, if the email is about booking a meeting, extracts the meeting summary, start, and end time in ISO format as JSON.' },
        { role: 'user', content: `Reply to this email and, if it is a meeting request, extract the meeting details as JSON with keys summary, start, end:\n\n${emailText}` }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const aiMessage = response.data.choices[0].message.content.trim();

  // Try to extract JSON from the AI's response
  let event;
  const jsonMatch = aiMessage.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      event = JSON.parse(jsonMatch[0]);
    } catch (e) {
      event = undefined;
    }
  }
  return { reply: aiMessage, event };
}
async function main() {
  try {
    const email = await getLatestEmail();
    const emailText = extractPlainText(email.payload);
    console.log('Latest email text:', emailText);

    //const reply = await generateReply(emailText);
    const { reply, event } = await generateReplyAndEvent(emailText);
    console.log('Generated reply:', reply);

    if (event && event.summary && event.start && event.end) {
      const calendarEvent = await createCalendarEvent(event);
      console.log('Calendar event created:', calendarEvent.htmlLink);
    }

    await sendReply(email, reply);
    console.log('Reply sent!');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();