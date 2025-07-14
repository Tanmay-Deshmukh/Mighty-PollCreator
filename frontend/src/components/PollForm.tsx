import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import Input from './ui/Input';
import { X } from 'lucide-react';

interface PollFormProps {
    onSubmit: (pollData: { question: string; options: string[] }) => void;
    loading?: boolean;
    initialQuestion?: string;
    initialOptions?: string[];
    submitLabel?: string;
}

const PollForm: React.FC<PollFormProps> = ({
    onSubmit,
    loading,
    initialQuestion = '',
    initialOptions = ['', ''],
    submitLabel = 'Create Poll',
}) => {
    const [question, setQuestion] = useState(initialQuestion);
    const [options, setOptions] = useState<string[]>(initialOptions);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setQuestion(initialQuestion);
        setOptions(initialOptions);
    }, [initialQuestion, initialOptions]);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 5) {
            setOptions([...options, '']);
        }
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!question.trim()) {
            setError('Poll question cannot be empty.');
            return;
        }
        const nonEmptyOptions = options.filter(option => option.trim() !== '');
        if (nonEmptyOptions.length < 2) {
            setError('Please provide at least 2 non-empty options.');
            return;
        }
        if (nonEmptyOptions.length !== options.length) {
            setError('All options must be non-empty.');
            return;
        }

        onSubmit({ question, options });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="text-red-600 font-medium">{error}</div>
            )}
            <div>
                <label className="block text-sm font-medium text-gray-700">Poll Question</label>
                <Input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Poll Options</label>
                {options.map((option, index) => (
                    <div key={index} className="flex items-center mt-1">
                        <Input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                            disabled={loading}
                            className="flex-1"
                        />
                        {options.length > 2 && (
                            <Button
                                type="button"
                                onClick={() => removeOption(index)}
                                variant="dangerOutline"
                                className="ml-2 p-2"
                                aria-label="Remove option"
                            >
                                <X size={18} />
                            </Button>
                        )}
                    </div>
                ))}
                <Button
                    type="button"
                    onClick={addOption}
                    className="mt-2"
                    disabled={loading || options.length >= 5}
                    variant="outline"
                >
                    + Add Option
                </Button>
            </div>
            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading ? 'Saving...' : submitLabel}
            </Button>
        </form>
    );
};

export default PollForm;