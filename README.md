<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Email Queue Service

A NestJS-based service for queuing and sending emails efficiently using Bull for background processing.

## Overview

This project provides a REST API to queue emails for asynchronous sending. It leverages:

- [NestJS](https://github.com/nestjs/nest) for the application framework.
- [Bull](https://github.com/OptimalBits/bull) for managing job queues.
- [Nodemailer](https://nodemailer.com/about/) for email delivery.

## Features

- **Queue Emails**: POST email details to be queued for sending.
- **Check Status**: GET endpoint to check the status of an email job.
- **Configurable**: Uses environment variables for SMTP and Redis configuration.
- **Testing**: Includes unit and e2e tests.

## Prerequisites

- Node.js (v16+ recommended)
- Redis server

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the project root with your configuration parameters. For example:

```dotenv
# Redis configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# SMTP configuration (for production)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_username
SMTP_PASSWORD=your_password
```

If running in a development environment, the project uses [Ethereal Mail](https://ethereal.email/) to simulate email delivery.

## Running the Application

```bash
# Start in development mode with hot reload
npm run start:dev

# Start in production mode
npm run start:prod
```

## API Endpoints

- **POST /email/send**  
  Queues an email for sending.  
  Refer to [`src/email/email.controller.ts`](src/email/email.controller.ts) for implementation.

- **GET /email/status/:id**  
  Retrieves the status of a queued email job.

## Testing

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

## Deployment

For production deployment, ensure your environment variables (SMTP and Redis settings) are correctly set. You can deploy your application using containers or your preferred cloud platform.

## License

This project is licensed under the MIT License.
