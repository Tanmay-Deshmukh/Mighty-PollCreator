import React from 'react';
import { Poll } from '../types/poll';
import Card from './ui/Card';
import Progress from './ui/Progress';

interface PollCardProps {
    poll: Poll;
    onClick?: () => void;
}

/**
 * PollCard displays a poll question and its options in a styled card.
 * Uses Tailwind CSS for aesthetics.
 */
const PollCard: React.FC<PollCardProps> = ({ poll, onClick }) => {
    const totalVotes = poll.options.reduce((total, option) => total + option.votes, 0);

    return (
        <Card className="cursor-pointer hover:shadow-lg transition border border-gray-100" onClick={onClick}>
            <h2 className="text-lg font-semibold text-gray-900">{poll.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                {poll.options.map(option => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                        <div
                            key={option.id}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2 flex flex-col items-center"
                        >
                            <span className="font-medium">{option.text}</span>
                            <span className="text-sm text-gray-600 mt-1">
                                {option.votes} vote{option.votes !== 1 ? 's' : ''} ({percentage.toFixed(1)}%)
                            </span>
                            <div className="w-full mt-2">
                                <Progress value={percentage} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default PollCard;