import { GmailClient } from './gmailClient';
import { Credentials } from './types';
import 'dotenv/config';

const credentials: Credentials = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  //refreshToken: process.env.GOOGLE_REFRESH_TOKEN!,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN! // Optional, can be set after OAuth flow
};


async function main() {

  console.log(credentials.accessToken);

  const client = new GmailClient();
  client.initialize(credentials);
   const messages = await client.listMessages();
   console.log("messages", messages);
   const message = await client.getMessage(messages[0].id);
  console.log("messages", message);
  const sentMessage = await client.sendEmail(
    "afshana.hussain@gmail.com", "Test Subject", "This is a test message");
  console.log("sentMessage", sentMessage);
}

main();