// This file defines TypeScript interfaces for the poll and option data structures.
// It exports interfaces Poll and PollOption.

export interface PollOption {
    id: string; // Unique identifier for the option
    text: string; // The option's text
    votes: number; // Count of votes for this option
}

export interface Poll {
    id: string; // Unique identifier for the poll
    question: string; // The poll question
    options: PollOption[]; // Array of options for the poll
}