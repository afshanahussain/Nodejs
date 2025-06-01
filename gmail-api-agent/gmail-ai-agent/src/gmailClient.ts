import 'dotenv/config';
import { google } from 'googleapis';
import { Credentials } from './types';




export class GmailClient {
    private oauth2Client: any;

    constructor() {
        this.oauth2Client = null;
    }


    initialize(credentials: Credentials) {
        this.oauth2Client = new google.auth.OAuth2(
            credentials.clientId,
            credentials.clientSecret,
            credentials.redirectUri
            
        );
        this.oauth2Client.setCredentials({
            access_token: credentials.accessToken,
        });
        


    }

    async listMessages(userId: string = 'me') {
        const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
        const res = await gmail.users.messages.list({
            userId: userId,
        });
        return res.data.messages || [];
    }

    async getMessage(id: string, userId: string = 'me') {
        const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
        const res = await gmail.users.messages.get({
            userId: userId,
            id: id,
        });
        return res.data;
    }

    async sendEmail(to: string, subject: string, message: string, from: string = 'me') {
        const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });

        const encodedMessage = Buffer.from(
            `From: ${from}\r\n` +
            `To: ${to}\r\n` +
            `Subject: ${subject}\r\n` +
            `Content-Type: text/plain; charset="UTF-8"\r\n\r\n` +
            `${message}`
        )
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

        const res = await gmail.users.messages.send({
            userId: from,
            requestBody: {
                raw: encodedMessage,
            },
        });

        return res.data;
    }


}