# Quick Poll Creator

## Overview
Quick Poll Creator is a full-stack application for creating, editing, deleting, and voting on polls. Built with Next.js (frontend) and Express.js (backend), it uses TypeScript for type safety and Tailwind CSS for modern styling.

## Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm run start
   ```

### API Endpoints
- **POST /api/polls**: Create a new poll (with validation).
- **GET /api/polls**: Retrieve all polls.
- **GET /api/polls/:pollId**: Retrieve a specific poll by ID.
- **POST /api/polls/:pollId/vote**: Vote for an option in a poll.
- **PUT /api/polls/:pollId**: Edit a poll (question and options, with validation; votes are preserved if options are unchanged).
- **DELETE /api/polls/:pollId**: Delete a poll.

### Backend Features
- **Input Validation**: Ensures poll question is not empty, options are non-empty, at least 2 and at most 5 options.
- **Edit Poll**: Update poll question and/or options. Votes are only reset if options change.
- **Delete Poll**: Remove a poll by ID.

## Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Pages
- **Homepage (`/`)**: Displays all available polls with results preview.
- **Create Poll Page (`/create-poll`)**: Form to create a new poll with validation and option management.
- **Poll Detail Page (`/polls/[pollId]`)**: View poll details, vote, see results, edit or delete poll.
- **Edit Poll Page (`/polls/[pollId]/edit`)**: Edit poll question and options using a prefilled form.

### Frontend Features
- **Form Validation**: Client-side validation for poll creation and editing (question required, 2-5 non-empty options).
- **Edit Poll**: Prefilled form for editing polls; only updates votes if options change.
- **Delete Poll**: Confirmation dialog before deleting; removes poll and redirects to homepage.
- **Progress Bars**: Each option shows vote percentage with a progress bar.
- **Responsive Design**: Layout adapts to screen size.

## Styling
The frontend uses Tailwind CSS for a modern, responsive design.
