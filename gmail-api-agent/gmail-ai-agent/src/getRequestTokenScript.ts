import 'dotenv/config';
import { google } from 'googleapis';
import readline from 'readline';
import { Credentials } from './types';

const credentials: Credentials = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN!,
  accessToken: process.env.GOOGLE_ACCESS_TOKEN! // Optional, can be set after OAuth flow
};

async function main() {
  const oauth2Client = new google.auth.OAuth2(
    credentials.clientId,
    credentials.clientSecret,
    credentials.redirectUri
  );

  const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/calendar.events'
  // add more scopes as needed
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', async (code) => {
    try {
      const { tokens } = await oauth2Client.getToken(code.trim());
      console.log('Tokens:', tokens);
    } catch (err) {
      console.error('Error retrieving access token', err);
    }
    rl.close();
  });
}

main();