# Notification Service

## Overview

The Notification Service is a Node.js application built with Express and Socket.io that processes and queues email notifications. It includes functionality for emitting real-time notifications via Socket.io and adding email notifications to a queue for processing with a retry mechanism.

## Features

- **Express**: Web framework for building the server.
- **Socket.io**: Real-time communication for emitting notifications.
- **Nodemailer**: Sending emails.
- **Winston**: Logging.
- **Express-validator**: Request validation.
- **In-memory queue**: Simple queue implementation with retry logic.

## Prerequisites

- Node.js
- npm
- Redis (if you decide to use it for a more robust queue implementation)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/kazimsayed954/pearlT-Assessment.git
    cd pearlT-Assessment/client
    npm install 
    npm run dev
    cd ..

    cd pearlT-Assessment/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add your email credentials:
    ```
    EMAIL=your-email@gmail.com
    EMAIL_PASSWORD=your-email-password
    ```

## Running the Application

1. Start the server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### POST /notification

Queues a new notification to be sent.

**Request Body:**

```json
{
  "email": "user@example.com",
  "message": "Your custom message"
}
