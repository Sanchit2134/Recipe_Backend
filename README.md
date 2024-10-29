# Task Queueing System in Node.js

## Overview

This project implements a task queueing system designed to manage tasks for individual users in a Node.js backend application. The system incorporates rate limiting, logging of task completions, and resilient error handling to ensure smooth operation.

## Components

### Folder Structure

The project follows a modular structure to improve maintainability and readability. Here’s a brief overview of the main folders and files:


### Key Modules

#### 1. `taskQueue.js`

- **Purpose**: Manages task queues for each user using a Map to store user-specific tasks.
- **Features**:
  - Enqueues tasks and processes them sequentially.
  - Automatically handles task completion and logging.

#### 2. `taskLogger.js`

- **Purpose**: Logs task completions to a text file.
- **Features**:
  - Appends a log entry with user ID and timestamp upon task completion.

#### 3. `rateLimit.js`

- **Purpose**: Implements rate limiting to control the number of tasks a user can queue in a given timeframe.
- **Assumptions**:
  - Each user can only queue a specific number of tasks per second and per minute.

#### 4. `taskProcessor.js`

- **Purpose**: Simulates the processing of tasks.
- **Features**:
  - Represents an asynchronous operation that could be a database call or other lengthy task.

#### 5. `index.js`

- **Purpose**: Sets up the Express server and routes.
- **Features**:
  - Defines an API endpoint to accept new tasks, validates input, applies rate limiting, and queues tasks.

### API Endpoint

- **POST `/api/v1/tasks`**
  - **Request Body**: 
    ```json
    {
      "userId": "string",
      "taskData": "string"
    }
    ```
  - **Response**:
    - `200 OK` - Task queued successfully.
    - `400 Bad Request` - If `userId` or `taskData` is missing.
    - `429 Too Many Requests` - If rate limit exceeded.

### Error Handling and Resilience

- Implemented `try-catch` blocks in asynchronous functions to handle errors gracefully.
- Added logging to capture error details, helping with debugging.
- Ensured that failures in one user’s tasks do not impact other users’ processing.

## Assumptions Made

1. **Single User Queuing**: Each user has an independent task queue to ensure that tasks are processed sequentially.
2. **Rate Limiting**: Assumed that tasks must be limited to prevent abuse; used a simple implementation with per-second and per-minute limits.
3. **Task Simulations**: The tasks are simulated for this implementation, assuming that real-world tasks would likely involve database operations or external API calls.
4. **File-Based Logging**: Chose a simple text file for logging task completions; this can be changed to a more robust solution if needed (e.g., logging libraries, databases).
5. **Environment Configuration**: Assumed usage of a `.env` file for sensitive configurations like database URIs and ports.

## Conclusion

This project provides a comprehensive task queueing system implemented in a Node.js backend application. The modular approach and careful consideration of error handling ensure a reliable and maintainable codebase. Future enhancements could involve using a message broker (like RabbitMQ or Redis) for distributed task management or a more sophisticated logging system.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
