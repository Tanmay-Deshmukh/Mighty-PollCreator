# Quick Poll Creator Backend

## Overview
The Quick Poll Creator is a full-stack application that allows users to create polls, vote on them, and view the results. This backend is built using Express.js and TypeScript, providing a simple API to manage polls and votes.

## Project Structure
```
quick-poll-creator
├── backend
│   ├── src
│   │   ├── app.ts
│   │   ├── routes
│   │   │   └── polls.ts
│   │   ├── data
│   │   │   └── polls.ts
│   │   └── types
│   │       └── poll.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd quick-poll-creator/backend
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application**
   Start the server using:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

## API Endpoints

### Polls

- **Create a Poll**
  - **Endpoint:** `POST /api/polls`
  - **Request Body:** `{ "question": "string", "options": ["string", "string", ...] }`
  - **Response:** Newly created poll object.

- **Get All Polls**
  - **Endpoint:** `GET /api/polls`
  - **Response:** Array of poll objects.

- **Get a Poll by ID**
  - **Endpoint:** `GET /api/polls/:pollId`
  - **Response:** Poll object if found, or 404 error.

- **Vote on a Poll**
  - **Endpoint:** `POST /api/polls/:pollId/vote`
  - **Request Body:** `{ "optionId": "string" }`
  - **Response:** Updated poll object with new vote count.

## Error Handling
The API includes basic error handling for:
- 404 Not Found
- 400 Bad Request

## Development Notes
- The backend uses in-memory storage for simplicity. For production, consider integrating a database.
- Ensure to follow best practices for error handling and input validation.

## License
This project is licensed under the MIT License.