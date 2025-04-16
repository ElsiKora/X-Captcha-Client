<p align="center">
  <img src="https://6jft62zmy9nx2oea.public.blob.vercel-storage.com/x-captcha-client-QFZfszIuV3in1pXShpw8jlp8meAzSk.png" width="500" alt="project-logo">
</p>

<h1 align="center">X-Captcha-Client 🔐</h1>
<p align="center"><em>TypeScript client for the XCaptcha API - challenge-based bot protection for your web applications</em></p>

<p align="center">
    <a aria-label="ElsiKora logo" href="https://elsikora.com">
  <img src="https://img.shields.io/badge/MADE%20BY%20ElsiKora-333333.svg?style=for-the-badge" alt="ElsiKora">
</a> <img src="https://img.shields.io/badge/TypeScript-blue.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/npm-red.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm"> <img src="https://img.shields.io/badge/license-green.svg?style=for-the-badge&logo=license&logoColor=white" alt="license"> <img src="https://img.shields.io/badge/API-orange.svg?style=for-the-badge&logo=api&logoColor=white" alt="API">
</p>


## 📚 Table of Contents
- [Description](#-description)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [License](#-license)


## 📖 Description
The X-Captcha-Client provides a robust and type-safe way to integrate challenge-based bot protection into your applications. Designed to be easy to use yet powerful, this client library allows you to create, verify, and manage different types of challenges like click verification and proof-of-work (PoW) to effectively distinguish between human users and automated bots. This SDK handles all the complex serialization, error handling, and API communication, allowing you to focus on implementing bot protection with minimal effort. Perfect for developers building secure web applications, authentication systems, or any service that needs to prevent automated abuse.

## 🚀 Features
- ✨ **Type-safe client for XCaptcha API with full TypeScript support**
- ✨ **Multiple challenge types including click verification and proof-of-work (PoW)**
- ✨ **Comprehensive error handling with detailed error types**
- ✨ **Automatic serialization and deserialization of API requests and responses**
- ✨ **Environment-aware runtime detection for optimal performance**
- ✨ **Customizable timeouts, retries, and request options**
- ✨ **Promise-based API for easy integration with async/await**
- ✨ **Cross-platform compatibility across Node.js, browsers, and other environments**
- ✨ **Built-in support for streaming responses and SSE events**

## 🛠 Installation
```bash
# Using npm
npm install xcaptcha-api

# Using yarn
yarn add xcaptcha-api

# Using pnpm
pnpm add xcaptcha-api
```

## 💡 Usage
## Basic Setup

Start by initializing the XCaptcha client with your API key and secret key:

```typescript
import { XCaptchaApiClient } from 'xcaptcha-api';

const client = new XCaptchaApiClient({
  apiKey: 'your-api-key',
  secretKey: 'your-secret-key',
  // Optional: custom environment URL
  // environment: 'https://api.xcaptcha.com'
});
```

## Creating a Challenge

Create a new CAPTCHA challenge for your users:

```typescript
// Create a click-based challenge
const clickChallenge = await client.challenge.create({
  type: 'click'
});

console.log('Challenge created:', clickChallenge.id);

// Or create a proof-of-work challenge
const powChallenge = await client.challenge.create({
  type: 'pow'
});
```

## Handling Challenge Responses

Once your user completes a challenge, verify their solution:

```typescript
// For a click challenge
const clickSolution = await client.challenge.solve(
  challengeId, 
  {
    solution: {
      type: 'click',
      data: true // User clicked the correct area
    }
  }
);

// For a proof-of-work challenge
const powSolution = await client.challenge.solve(
  challengeId,
  {
    solution: {
      type: 'pow',
      hash: 'calculated-hash-value',
      nonce: 'discovered-nonce-value'
    }
  }
);

// Get the token that proves the challenge was solved
const token = clickSolution.token; // or powSolution.token
```

## Verifying Tokens

Verify that a token is valid after a challenge has been solved:

```typescript
const verificationResult = await client.challenge.verify(
  challengeId,
  { token: 'challenge-solution-token' }
);

if (verificationResult.isSolved) {
  // Challenge was successfully solved, proceed with user action
  allowUserAction();
} else {
  // Challenge verification failed, block the action
  blockUserAction();
}
```

## Error Handling

The SDK provides specific error types for different error scenarios:

```typescript
import { 
  XCaptchaApiError, 
  XCaptchaApiTimeoutError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError
} from 'xcaptcha-api';

try {
  const challenge = await client.challenge.create({ type: 'click' });
  // Process challenge...
} catch (error) {
  if (error instanceof BadRequestError) {
    console.error('Invalid request format:', error.body.message);
  } else if (error instanceof UnauthorizedError) {
    console.error('Authentication failed:', error.body.message);
  } else if (error instanceof NotFoundError) {
    console.error('Challenge not found:', error.body.message);
  } else if (error instanceof InternalServerError) {
    console.error('Server error:', error.body.message);
  } else if (error instanceof XCaptchaApiTimeoutError) {
    console.error('Request timed out');
  } else if (error instanceof XCaptchaApiError) {
    console.error('API error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Advanced Options

### Request Customization

You can customize individual requests with options:

```typescript
const challenge = await client.challenge.create(
  { type: 'click' },
  { 
    timeoutInSeconds: 30,    // Custom timeout
    maxRetries: 3,           // Custom retry count
    secretKey: 'override-secret-key',  // Override secret key
    headers: {               // Custom headers
      'Custom-Header': 'value'
    },
    abortSignal: abortController.signal  // Abort control
  }
);
```

### Using in Browser Environments

The SDK automatically detects the runtime environment and adapts accordingly:

```typescript
// In browser applications, ensure you keep API secrets server-side
// This is a client-side example that should call your backend
import { XCaptchaApiClient } from 'xcaptcha-api';

// This client should be initialized by your server and challenge data
// should be passed to the frontend
function renderCaptcha(challengeData) {
  // Display the challenge to the user
  const captchaContainer = document.getElementById('captcha-container');
  
  if (challengeData.type === 'click') {
    // Render click challenge UI...
    captchaContainer.innerHTML = `
      <div class="click-challenge">
        <p>Click the correct area to prove you're human</p>
        <div class="clickable-area" data-challenge="${challengeData.id}"></div>
      </div>
    `;
  } else if (challengeData.type === 'pow') {
    // Render proof-of-work challenge UI...
    captchaContainer.innerHTML = `
      <div class="pow-challenge">
        <p>Calculating proof of work...</p>
        <div class="progress-bar"></div>
      </div>
    `;
    // Start calculating PoW solution in a web worker
    startPowCalculation(challengeData);
  }
}
```

## 🛣 Roadmap
| Task / Feature | Status |
|----------------|--------|
| Core API client implementation | ✅ Done |
| Challenge creation functionality | ✅ Done |
| Challenge verification | ✅ Done |
| Click-based challenges | ✅ Done |
| Proof-of-Work challenges | ✅ Done |
| Error handling and typed exceptions | ✅ Done |
| Streaming response support | ✅ Done |
| Cross-platform runtime detection | ✅ Done |
| React integration components | 🚧 In Progress |
| Browser fingerprinting integration | 🚧 In Progress |
| Machine learning detection | 🚧 In Progress |
| Rate limiting features | 🚧 In Progress |
| IP reputation analysis | 🚧 In Progress |
| WebAuthn/FIDO2 challenge types | 🚧 In Progress |
| Audio-based challenges | 🚧 In Progress |
| Behavioral analysis | 🚧 In Progress |
| Admin dashboard SDK | 🚧 In Progress |
| Analytics and reporting | 🚧 In Progress |

## ❓ FAQ
## Frequently Asked Questions

### What types of challenges does XCaptcha support?
XCaptcha currently supports click-based challenges and proof-of-work (PoW) challenges. Click challenges require users to click on specific elements, while PoW challenges require the client to perform computational work to prevent spam.

### How does XCaptcha compare to reCAPTCHA?
XCaptcha provides similar bot protection capabilities but with more flexibility, better privacy, and the ability to customize challenge types. Unlike reCAPTCHA, XCaptcha doesn't require Google services and gives you more control over the user experience.

### Is the SDK compatible with server-side frameworks?
Yes, the X-Captcha-Client is compatible with Node.js server environments and can be used with frameworks like Express, NestJS, and others. The SDK automatically detects the runtime environment and optimizes accordingly.

### How do I implement this in a frontend framework?
For frontend frameworks like React, Vue, or Angular, you typically would create a backend endpoint that generates a challenge, then use the challenge data to render the appropriate UI component. The user's solution is then sent back to your backend to verify using the SDK.

### What happens if a challenge times out?
If a challenge request times out, the SDK will throw a `XCaptchaApiTimeoutError`. You can customize the timeout duration and retry behavior using the request options.

### Can I use custom challenge UI?
Yes, the XCaptcha API provides the challenge data, but you have complete control over how to render and style the challenge UI in your application.

## 🔒 License
This project is licensed under **MIT**.
