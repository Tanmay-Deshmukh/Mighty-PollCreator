import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Poll, PollOption } from '../types/poll';
import { polls } from '../data/polls';

const router = express.Router();

// POST /api/polls - Create a new poll
router.post('/', (req: Request, res: Response) => {
    let { question, options }: { question: string; options: string[] } = req.body;

    // Validation
    if (!question || typeof question !== 'string' || !question.trim()) {
        return res.status(400).json({ error: 'Poll question cannot be empty.' });
    }
    if (!Array.isArray(options)) {
        return res.status(400).json({ error: 'Options must be an array.' });
    }
    // Remove empty options
    options = options.filter(opt => typeof opt === 'string' && opt.trim() !== '');
    if (options.length < 2) {
        return res.status(400).json({ error: 'Please provide at least 2 non-empty options.' });
    }
    if (options.length > 5) {
        return res.status(400).json({ error: 'No more than 5 options allowed.' });
    }

    const pollId = uuidv4();
    const newPoll: Poll = {
        id: pollId,
        question: question.trim(),
        options: options.map(option => ({
            id: uuidv4(),
            text: option.trim(),
            votes: 0
        }))
    };

    polls.push(newPoll);
    res.status(201).json(newPoll);
});

// GET /api/polls - Retrieve all polls
router.get('/', (req: Request, res: Response) => {
    res.json(polls);
});

// GET /api/polls/:pollId - Retrieve a single poll by ID
router.get('/:pollId', (req: Request, res: Response) => {
    const pollId = req.params.pollId;
    const poll = polls.find((p: Poll) => p.id === pollId);

    if (!poll) {
        return res.status(404).json({ error: 'Poll not found.' });
    }

    res.json(poll);
});

// POST /api/polls/:pollId/vote - Submit a vote for a specific option
router.post('/:pollId/vote', (req: Request, res: Response) => {
    const pollId = req.params.pollId;
    const { optionId }: { optionId: string } = req.body;

    const poll = polls.find((p: Poll) => p.id === pollId);
    if (!poll) {
        return res.status(404).json({ error: 'Poll not found.' });
    }

    const option = poll.options.find((o: PollOption) => o.id === optionId);
    if (!option) {
        return res.status(404).json({ error: 'Option not found.' });
    }

    option.votes += 1;
    res.json(poll);
});

// PUT /api/polls/:pollId - Edit a poll
router.put('/:pollId', (req: Request, res: Response) => {
    const pollId = req.params.pollId;
    let { question, options }: { question: string; options: string[] } = req.body;

    const poll = polls.find((p: Poll) => p.id === pollId);
    if (!poll) {
        return res.status(404).json({ error: 'Poll not found.' });
    }

    // Validation (same as creation)
    if (!question || typeof question !== 'string' || !question.trim()) {
        return res.status(400).json({ error: 'Poll question cannot be empty.' });
    }
    if (!Array.isArray(options)) {
        return res.status(400).json({ error: 'Options must be an array.' });
    }
    options = options.filter(opt => typeof opt === 'string' && opt.trim() !== '');
    if (options.length < 2) {
        return res.status(400).json({ error: 'Please provide at least 2 non-empty options.' });
    }
    if (options.length > 5) {
        return res.status(400).json({ error: 'No more than 5 options allowed.' });
    }

    poll.question = question.trim();

    // Check if options have changed (by text and count)
    const oldOptionTexts = poll.options.map(opt => opt.text);
    const newOptionTexts = options.map(opt => opt.trim());
    const optionsUnchanged =
        oldOptionTexts.length === newOptionTexts.length &&
        oldOptionTexts.every((text, idx) => text === newOptionTexts[idx]);

    if (optionsUnchanged) {
        // Only update question, keep options and votes
        // (option texts and order are the same)
    } else {
        // Options changed, reset votes
        poll.options = options.map(option => ({
            id: uuidv4(),
            text: option.trim(),
            votes: 0
        }));
    }

    res.json(poll);
});

// DELETE /api/polls/:pollId - Delete a poll
router.delete('/:pollId', (req: Request, res: Response) => {
    const pollId = req.params.pollId;
    const index = polls.findIndex((p: Poll) => p.id === pollId);
    if (index === -1) {
        return res.status(404).json({ error: 'Poll not found.' });
    }
    polls.splice(index, 1);
    res.json({ success: true });
});

export default router;