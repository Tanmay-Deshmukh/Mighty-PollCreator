// This file defines TypeScript interfaces for the poll and option data structures used in the frontend.
// It exports interfaces Poll and PollOption.

export interface PollOption {
    id: string;
    text: string;
    votes: number;
}

export interface Poll {
    id: string;
    question: string;
    options: PollOption[];
}