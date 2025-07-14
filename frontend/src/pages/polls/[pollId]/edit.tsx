import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PollForm from '../../../components/PollForm';
import Layout from '../../../components/Layout';
import { Poll } from '../../../types/poll';
import { apiFetch } from '../../../utils/api';
import { Button } from '../../../components/ui/Button';

const EditPoll = () => {
    const router = useRouter();
    const { pollId } = router.query;
    const [poll, setPoll] = useState<Poll | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (pollId) {
            const fetchPoll = async () => {
                try {
                    const response = await apiFetch(`/api/polls/${pollId}`);
                    if (!response.ok) throw new Error('Poll not found');
                    const data: Poll = await response.json();
                    setPoll(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchPoll();
        }
    }, [pollId]);

    const handleUpdate = async (pollData: { question: string; options: string[] }) => {
        setUpdating(true);
        setError(null);
        try {
            const response = await apiFetch(`/api/polls/${pollId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pollData),
            });
            if (!response.ok) {
                const errMsg = await response.text();
                throw new Error(errMsg || 'Failed to update poll');
            }
            router.push(`/polls/${pollId}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <Layout><div>Loading...</div></Layout>;
    if (error) return <Layout><div className="text-red-600">{error}</div></Layout>;
    if (!poll) return <Layout><div>Poll not found.</div></Layout>;

    return (
        <Layout>
            <Button onClick={() => router.push(`/polls/${pollId}`)} variant="outline" className="mb-4">{"< Back"}</Button>
            <h1 className="text-2xl font-bold mb-4">Edit Poll</h1>
            <PollForm
                onSubmit={handleUpdate}
                loading={updating}
                initialQuestion={poll.question}
                initialOptions={poll.options.map(opt => opt.text)}
                submitLabel="Update Poll"
            />
        </Layout>
    );
};

export default EditPoll;