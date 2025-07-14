// This file contains an in-memory array to store poll data.
// It exports the polls array and functions to manipulate it (add, get, and update polls).

import { Poll } from '../types/poll';

export let polls: Poll[] = [];

// Function to add a new poll
export const addPoll = (poll: Poll) => {
    polls.push(poll);
};

// Function to get all polls
export const getPolls = (): Poll[] => {
    return polls;
};

// Function to get a poll by ID
export const getPollById = (id: string): Poll | undefined => {
    return polls.find(poll => poll.id === id);
};

// Function to update a poll's option votes
export const voteOnPoll = (pollId: string, optionId: string): Poll | undefined => {
    const poll = getPollById(pollId);
    if (poll) {
        const option = poll.options.find(opt => opt.id === optionId);
        if (option) {
            option.votes += 1;
            return poll;
        }
    }
    return undefined;
};