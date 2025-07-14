import { useState } from 'react';
import { useRouter } from 'next/router';
import PollForm from '../components/PollForm';
import Layout from '../components/Layout';
import { apiFetch } from '../utils/api';
import { Button } from '../components/ui/Button';

const CreatePoll = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (pollData: { question: string; options: string[] }) => {
        setLoading(true);
        setError('');

        try {
            const response = await apiFetch('/api/polls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pollData),
            });

            if (!response.ok) {
                throw new Error('Failed to create poll');
            }

            const createdPoll = await response.json();
            router.push(`/polls/${createdPoll.id}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Button onClick={() => router.push('/')} variant="outline" className="mb-4">{"< Back"}</Button>
            <h1 className="text-2xl font-bold mb-4">Create a New Poll</h1>
            {error && <p className="text-red-500">{error}</p>}
            <PollForm onSubmit={handleSubmit} loading={loading} />
        </Layout>
    );
};

export default CreatePoll;