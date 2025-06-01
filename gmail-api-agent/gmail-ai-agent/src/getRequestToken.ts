import 'dotenv/config';
import { google } from 'googleapis';

const clientId = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const redirectUri = process.env.GOOGLE_REDIRECT_URI!;

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

// Scopes for Gmail API access
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  // add more scopes as needed
];

// Generate the URL to get the authorization code
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this url:', authUrl);

// After visiting the URL and authorizing, Google will redirect to your redirectUri with a code parameter.
// Exchange that code for tokens:
async function getToken(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  console.log('Tokens:', tokens);
  return tokens;
}

// Example usage:
// (Uncomment and replace 'YOUR_AUTH_CODE' with the code you get from the redirect URL)
// getToken('YOUR_AUTH_CODE').catch(console.error);