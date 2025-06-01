# Gmail AI Agent

This project is an AI-powered email agent that utilizes the Gmail API to compose and send emails. It provides a simple interface for users to interact with their Gmail account programmatically.

## Project Structure

```
gmail-ai-agent
├── src
│   ├── agent.ts          # Contains the EmailAgent class for email operations
│   ├── gmailClient.ts    # Contains the GmailClient class for Gmail API interactions
│   └── types
│       └── index.ts      # Defines TypeScript interfaces for email and authentication
├── package.json          # npm configuration file with dependencies and scripts
├── tsconfig.json         # TypeScript configuration file
└── README.md             # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/afshanahussain/gmail-ai-agent.git
   ```

2. Navigate to the project directory:
   ```
   cd gmail-ai-agent
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

### Authentication

Before using the EmailAgent, you need to authenticate with the Gmail API. This can be done using the `authenticate` method in the `EmailAgent` class.

### Composing and Sending Emails

To compose and send an email, create an instance of the `EmailAgent` class and use the `composeEmail` and `sendEmail` methods.

```typescript
import { EmailAgent } from './src/agent';

const emailAgent = new EmailAgent();
await emailAgent.authenticate();
const emailContent = emailAgent.composeEmail('recipient@example.com', 'Subject', 'Email body');
await emailAgent.sendEmail(emailContent);

```

This project is a Node.js/TypeScript agent that connects to your Gmail account using the Gmail API. It can read your emails, send emails, and (optionally) use AI (like OpenAI or OpenRouter) to generate smart replies or summaries. The project is designed for extensibility and can be used as a base for building intelligent email automation tools.

---

## Features

- **Read Gmail messages**  
- **Send emails via Gmail API**
- **Generate AI-powered replies (optional, with OpenAI/OpenRouter)**
- **Book Google Calendar events (optional)**
- **Environment-based configuration for security**

---

## Setup

### 1. Clone the Repository

```sh
git clone https://github.com/afshanahussain/gmail-api-agent.git
cd gmail-api-agent/gmail-ai-agent
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=your-redirect-uri
GOOGLE_REFRESH_TOKEN=your-refresh-token
GOOGLE_ACCESS_TOKEN=your-access-token
OPENAI_API_KEY=your-openai-api-key         # (optional, for AI features)
OPENROUTER_API_KEY=your-openrouter-api-key # (optional, for AI features)
```

**Never commit your `.env` file to version control.**

---

## Usage

### 1. Get OAuth2 Tokens

Use the provided script to generate your tokens:

```sh
npx ts-node src/getRequestTokenScript.ts
```

Follow the instructions in the terminal to authorize and get your tokens.

### 2. Run the Gmail Client Test

This script demonstrates reading, fetching, and sending emails:

```sh
npx ts-node src/testGmailClient.ts
```

### 3. Run the AI Agent (Optional)

If you have set up an AI API key, you can run the AI agent to generate smart replies:

```sh
npx ts-node src/gmailAIAgent.ts
```

---

## Project Structure

```
src/
  gmailClient.ts         # Gmail API wrapper class
  testGmailClient.ts     # Example/test script for GmailClient
  getRequestTokenScript.ts # Script to obtain OAuth2 tokens
  gmailAIAgent.ts        # AI-powered Gmail agent (optional)
  types.ts               # TypeScript types
.env                     # Environment variables (not committed)
```

---

## Extending

- **Add more AI features** by editing `gmailAIAgent.ts`.
- **Automate calendar bookings** by using the Google Calendar API (see `gmailAIAgent.ts` for an example).
- **Write more tests** or scripts as needed.

---

## Security

- **Do not share your `.env` file or credentials.**
- **Restrict your OAuth2 credentials in the Google Cloud Console.**

---

## License

MIT

---

## Credits

- [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client)
- [OpenAI Node.js SDK](https://github.com/openai/openai-node)
- [OpenRouter](https://openrouter.ai/)

---

**Happy hacking!**

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
