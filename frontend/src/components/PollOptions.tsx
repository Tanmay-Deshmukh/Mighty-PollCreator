import React, { useState } from 'react';
import { PollOption } from '../types/poll';
import { Button } from './ui/Button';

interface PollOptionsProps {
    options: PollOption[];
    onVote: (optionId: string) => void;
}

const PollOptions: React.FC<PollOptionsProps> = ({ options, onVote }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [voted, setVoted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selected) {
            onVote(selected);
            setVoted(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                {options.map(option => (
                    <div key={option.id} className="flex items-center">
                        <input
                            type="radio"
                            id={option.id}
                            name="poll-option"
                            value={option.id}
                            checked={selected === option.id}
                            onChange={() => setSelected(option.id)}
                            disabled={voted}
                            className="mr-2"
                        />
                        <label htmlFor={option.id} className="text-lg">
                            {option.text}
                        </label>
                    </div>
                ))}
            </div>
            <Button
                type="submit"
                disabled={!selected || voted}
                className="mt-2"
            >
                Submit Vote
            </Button>
        </form>
    );
};

export default PollOptions;