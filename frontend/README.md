# Quick Poll Creator - Frontend

## Overview
The Quick Poll Creator is a full-stack application that allows users to create polls, vote on them, and view the results. This project utilizes Next.js for the frontend and Express.js for the backend, providing a seamless user experience.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd quick-poll-creator
   ```

2. Navigate to the frontend directory:
   ```
   cd frontend
   ```

3. Install the dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

### Features
- Create new polls with a question and multiple options.
- Vote on existing polls and view real-time results.
- Responsive design using Tailwind CSS for a modern look and feel.

### File Structure
- `src/pages`: Contains the main pages of the application.
- `src/components`: Contains reusable React components.
- `src/styles`: Contains global styles and Tailwind CSS configuration.
- `src/types`: Contains TypeScript interfaces for type safety.

### API Endpoints
The frontend communicates with the backend API to manage polls. The following endpoints are used:
- `POST /api/polls`: Create a new poll.
- `GET /api/polls`: Retrieve all polls.
- `GET /api/polls/:pollId`: Retrieve a specific poll by ID.
- `POST /api/polls/:pollId/vote`: Submit a vote for a specific option.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.