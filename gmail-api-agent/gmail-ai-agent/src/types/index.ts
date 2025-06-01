export interface Email {
    to: string;
    subject: string;
    body: string;
}

export interface Message {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    payload: {
        headers: Array<{
            name: string;
            value: string;
        }>;
        body: {
            data: string;
            size: number;
        };
    };
}

export interface Credentials {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    refreshToken: string;
    accessToken: string; // Optional, can be set after OAuth flow
}