<p align="center">
  <img src="https://6jft62zmy9nx2oea.public.blob.vercel-storage.com/x-captcha-client-QFZfszIuV3in1pXShpw8jlp8meAzSk.png" width="500" alt="project-logo">
</p>

<h1 align="center">🛡️ X-Captcha-Client</h1>
<p align="center"><em>A modern client library for seamless integration with X-Captcha services</em></p>

<p align="center">
    <a aria-label="ElsiKora logo" href="https://elsikora.com">
  <img src="https://img.shields.io/badge/MADE%20BY%20ElsiKora-333333.svg?style=for-the-badge" alt="ElsiKora">
</a> <img src="https://img.shields.io/badge/npm-blue.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm"> <img src="https://img.shields.io/badge/typescript-blue.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript"> <img src="https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge&logo=license&logoColor=white" alt="license-MIT"> <img src="https://img.shields.io/badge/version-1.0.0-brightgreen.svg?style=for-the-badge&logo=semver&logoColor=white" alt="version-1.0.0"> <img src="https://img.shields.io/badge/zero-dependencies-orange.svg?style=for-the-badge&logo=npm&logoColor=white" alt="zero-dependencies"> <img src="https://img.shields.io/badge/ESM-yellow.svg?style=for-the-badge&logo=javascript&logoColor=white" alt="ESM"> <img src="https://img.shields.io/badge/CJS-yellow.svg?style=for-the-badge&logo=javascript&logoColor=white" alt="CJS">
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
X-Captcha-Client is a lightweight, zero-dependency TypeScript client library that provides easy integration with the X-Captcha service for bot protection. Designed with modern web applications in mind, it enables developers to protect their forms and sensitive actions from automated attacks while maintaining an excellent user experience. The library follows clean architecture principles, separating concerns between domain logic, application services, and infrastructure, making it maintainable and easy to extend. Whether you're building a React application, a Vue project, or any other JavaScript framework, X-Captcha-Client provides a consistent API to generate and validate captcha challenges.

## 🚀 Features
- ✨ **Zero dependencies - lightweight integration with minimal footprint**
- ✨ **Modern TypeScript implementation with full type definitions**
- ✨ **Clean architecture design for enhanced maintainability**
- ✨ **Support for multiple captcha challenge types (currently: click-based challenges)**
- ✨ **Dual package support for both ESM and CommonJS environments**
- ✨ **Comprehensive error handling and validation**
- ✨ **Promise-based API for seamless async integration**
- ✨ **Well-documented interfaces for easy implementation**
- ✨ **Minimal configuration required to get started**
- ✨ **Extensible architecture for future captcha types**

## 🛠 Installation
```bash
### npm

npm install x-captcha-client


### yarn

yarn add x-captcha-client


### pnpm

pnpm add x-captcha-client


### bun

bun add x-captcha-client
```

## 💡 Usage
## Basic Usage

The X-Captcha-Client provides a simple interface to integrate captcha challenges in your application. Here's how to get started:

```typescript
import { CaptchaClient, ICaptchaValidationRequest } from 'x-captcha-client';

// Initialize the client with your API URL
const captchaClient = new CaptchaClient({
  apiUrl: 'https://api.xcaptcha.com/v1'
});

// Get a captcha challenge
async function loadCaptcha() {
  try {
    const challenge = await captchaClient.getChallenge();
    console.log('Challenge received:', challenge);
    
    // Render your captcha UI using the challenge data
    // challenge.id - unique identifier for this challenge
    // challenge.type - type of challenge (e.g., 'click')
    // challenge.createdAt - when the challenge was created
    // challenge.expiresAt - when the challenge expires
    
    return challenge;
  } catch (error) {
    console.error('Failed to load captcha:', error);
  }
}

// Validate a captcha response
async function validateCaptcha(challengeId: string, userResponse: any) {
  try {
    const validationRequest: ICaptchaValidationRequest = {
      challengeId,
      response: userResponse
    };
    
    const result = await captchaClient.validate(validationRequest);
    
    if (result.isSuccess) {
      console.log('Validation successful! Token:', result.token);
      return result.token; // Use this token for subsequent API calls
    } else {
      console.error('Validation failed:', result.error);
      return null;
    }
  } catch (error) {
    console.error('Error during validation:', error);
    return null;
  }
}
```

## React Integration

Here's an example of how to integrate X-Captcha-Client in a React application:

```tsx
import React, { useState, useEffect } from 'react';
import { CaptchaClient, ICaptchaChallenge } from 'x-captcha-client';

const captchaClient = new CaptchaClient({
  apiUrl: 'https://api.xcaptcha.com/v1'
});

const CaptchaComponent: React.FC = () => {
  const [challenge, setChallenge] = useState<ICaptchaChallenge | null>(null);
  const [userResponse, setUserResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [validated, setValidated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Load a new captcha when component mounts
    loadCaptcha();
  }, []);
  
  const loadCaptcha = async () => {
    setLoading(true);
    setError(null);
    try {
      const newChallenge = await captchaClient.getChallenge();
      setChallenge(newChallenge);
    } catch (err) {
      setError('Failed to load captcha. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCaptchaResponse = (response: any) => {
    setUserResponse(response);
  };
  
  const handleSubmit = async () => {
    if (!challenge || !userResponse) return;
    
    try {
      const result = await captchaClient.validate({
        challengeId: challenge.id,
        response: userResponse
      });
      
      if (result.isSuccess) {
        setValidated(true);
        // Store token or proceed with form submission
        localStorage.setItem('captchaToken', result.token || '');
      } else {
        setError(result.error || 'Validation failed. Please try again.');
        // Reset captcha
        loadCaptcha();
      }
    } catch (err) {
      setError('An error occurred during validation. Please try again.');
    }
  };
  
  if (loading) {
    return <div>Loading captcha...</div>;
  }
  
  if (validated) {
    return <div>Captcha validation successful!</div>;
  }
  
  return (
    <div className="captcha-container">
      <h3>Please complete the captcha</h3>
      
      {error && <div className="error">{error}</div>}
      
      {challenge && (
        <div className="challenge">
          {/* Render appropriate challenge UI based on challenge.type */}
          {challenge.type === 'click' && (
            <ClickCaptchaRenderer 
              challenge={challenge} 
              onResponse={handleCaptchaResponse} 
            />
          )}
        </div>
      )}
      
      <button onClick={handleSubmit} disabled={!userResponse}>Verify</button>
      <button onClick={loadCaptcha}>New Captcha</button>
    </div>
  );
};

// This would be your custom renderer for the click captcha type
const ClickCaptchaRenderer = ({ challenge, onResponse }) => {
  // Implementation details would depend on your actual captcha visualization
  return (
    <div className="click-captcha">
      {/* Implement your click challenge UI here */}
    </div>
  );
};

export default CaptchaComponent;
```

## Using with Express.js Backend

Here's how to validate a captcha token on your backend:

```typescript
import express from 'express';
import { CaptchaClient } from 'x-captcha-client';

const app = express();
app.use(express.json());

// Create a captcha client instance
const captchaClient = new CaptchaClient({
  apiUrl: process.env.XCAPTCHA_API_URL || 'https://api.xcaptcha.com/v1'
});

// Middleware to validate captcha tokens
const validateCaptchaToken = async (req, res, next) => {
  const { captchaId, captchaResponse } = req.body;
  
  if (!captchaId || !captchaResponse) {
    return res.status(400).json({ error: 'Missing captcha information' });
  }
  
  try {
    const validationResult = await captchaClient.validate({
      challengeId: captchaId,
      response: captchaResponse
    });
    
    if (!validationResult.isSuccess) {
      return res.status(403).json({ error: 'Captcha validation failed', details: validationResult.error });
    }
    
    // Store validation result for use in route handlers
    req.captchaValidated = true;
    req.captchaToken = validationResult.token;
    next();
  } catch (error) {
    console.error('Captcha validation error:', error);
    return res.status(500).json({ error: 'Failed to validate captcha' });
  }
};

// Example protected route
app.post('/api/protected-action', validateCaptchaToken, (req, res) => {
  // If we get here, the captcha was validated successfully
  res.json({ success: true, message: 'Action completed successfully' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Advanced Usage: Custom API Client

You can create a custom API client implementation if you need to customize the network requests:

```typescript
import { ICaptchaApiClient, ICaptchaChallenge, ICaptchaValidationRequest, ICaptchaValidationResult } from 'x-captcha-client';

class CustomCaptchaApiClient implements ICaptchaApiClient {
  constructor(private readonly apiUrl: string, private readonly apiKey: string) {}
  
  async fetchChallenge(): Promise<ICaptchaChallenge> {
    const response = await fetch(`${this.apiUrl}/challenge`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Custom-Header': 'CustomValue'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch challenge: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      expiresAt: new Date(data.expiresAt),
    };
  }
  
  async validateChallenge(request: ICaptchaValidationRequest): Promise<ICaptchaValidationResult> {
    const response = await fetch(`${this.apiUrl}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Custom-Header': 'CustomValue'
      },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      return {
        isSuccess: false,
        error: `Request failed: ${response.statusText}`
      };
    }
    
    return await response.json();
  }
}

// Then create a CaptchaService with your custom client
import { CaptchaService } from 'x-captcha-client';

const apiClient = new CustomCaptchaApiClient('https://api.xcaptcha.com/v1', 'your-api-key');
const captchaService = new CaptchaService(apiClient);

// Use the service directly
const challenge = await captchaService.getChallenge();
```

## 🛣 Roadmap
| Task / Feature | Status |
|---------------|--------|
| ## Future Development | 🚧 In Progress |
| - Add support for more captcha types (slider, image selection, puzzle, etc.) | 🚧 In Progress |
| - Create ready-to-use UI components for popular frameworks (React, Vue, Angular) | 🚧 In Progress |
| - Implement WebAssembly-based challenge verification for enhanced security | 🚧 In Progress |
| - Add support for accessibility features to ensure compliance with WCAG guidelines | 🚧 In Progress |
| - Develop a mock server for easy testing during development | 🚧 In Progress |
| - Create plugins for popular form libraries like Formik, React Hook Form, etc. | 🚧 In Progress |
| - Add analytics capabilities to track and analyze bot attempts | 🚧 In Progress |
| - Implement rate limiting and throttling for enhanced protection | 🚧 In Progress |
| - Add support for offline verification for scenarios with limited connectivity | 🚧 In Progress |
| (done) Zero dependencies - lightweight integration with minimal footprint | 🚧 In Progress |
| (done) Modern TypeScript implementation with full type definitions | 🚧 In Progress |
| (done) Clean architecture design for enhanced maintainability | 🚧 In Progress |

## ❓ FAQ
## Frequently Asked Questions

### What is X-Captcha?
X-Captcha is a service that provides captcha challenges to protect your web forms and APIs from bots and automated attacks. X-Captcha-Client is the official client library for integrating with this service.

### Does this library include UI components?
No, this library provides the API client for fetching and validating captchas, but it does not include UI components. You'll need to create your own UI or use a separate UI library compatible with the X-Captcha API.

### What captcha types are supported?
Currently, the library supports click-based challenges (ECaptchaType.CLICK). Additional types will be added in future releases.

### How do I handle expired captchas?
Captcha challenges have an `expiresAt` property. You should check this timestamp and request a new challenge if the current one has expired. You can also implement a timer to automatically refresh the challenge before it expires.

### Is this library compatible with server-side rendering (SSR)?
Yes, the library is designed to work in both browser and server environments. On the server side, you can use it to validate tokens, while on the client side you can fetch and render challenges.

### Do I need an API key to use X-Captcha?
Yes, you'll need to sign up for the X-Captcha service to get an API key. Contact the service provider for details on obtaining access credentials.

### How can I customize the look and feel of the captcha?
This library handles the API communication but not the presentation. You're free to style the captcha UI according to your application's design system.

### Does X-Captcha-Client support multiple languages?
The API responses can support multiple languages if the X-Captcha service provides localized challenges. You may need to specify a language preference when configuring the client or requesting challenges.

## 🔒 License
This project is licensed under **This project is licensed under the MIT License - see the LICENSE file for details.

MIT License

Copyright (c) 2025 ElsiKora

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.**.
