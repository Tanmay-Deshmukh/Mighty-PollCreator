import React from 'react';
import { Poll } from '../types/poll';
import Card from './ui/Card';
import Progress from './ui/Progress';

interface PollResultsProps {
    poll: Poll;
}

const PollResults: React.FC<PollResultsProps> = ({ poll }) => {
    const totalVotes = poll.options.reduce((total, option) => total + option.votes, 0);

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Results for: {poll.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {poll.options.map(option => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                        <Card key={option.id} className="flex flex-col items-center">
                            <span className="font-medium">{option.text}</span>
                            <span className="text-sm text-gray-600 mt-1">{option.votes} vote{option.votes !== 1 ? 's' : ''} ({percentage.toFixed(1)}%)</span>
                            <div className="w-full mt-2">
                                <Progress value={percentage} />
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default PollResults;