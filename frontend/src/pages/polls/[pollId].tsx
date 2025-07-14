import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PollOptions from '../../components/PollOptions';
import PollResults from '../../components/PollResults';
import Layout from '../../components/Layout';
import { Poll } from '../../types/poll';
import { apiFetch } from '../../utils/api';
import { Button } from '../../components/ui/Button';

const PollDetail = () => {
    const router = useRouter();
    const { pollId } = router.query;
    const [poll, setPoll] = useState<Poll | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (pollId) {
            const fetchPoll = async () => {
                try {
                    const response = await apiFetch(`/api/polls/${pollId}`);
                    if (!response.ok) {
                        throw new Error('Poll not found');
                    }
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

    const handleVote = async (optionId: string) => {
        try {
            const response = await apiFetch(`/api/polls/${pollId}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ optionId }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit vote');
            }

            const updatedPoll: Poll = await response.json();
            setPoll(updatedPoll);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        if (!poll) return;
        if (!window.confirm('Are you sure you want to delete this poll?')) return;
        setDeleting(true);
        try {
            const response = await apiFetch(`/api/polls/${poll.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                router.push('/');
            } else {
                setError('Failed to delete poll.');
            }
        } catch (err: any) {
            setError('Failed to delete poll.');
        } finally {
            setDeleting(false);
        }
    };

    const handleEdit = () => {
        router.push(`/polls/${pollId}/edit`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!poll) return <div>Poll not found.</div>;

    return (
        <Layout>
            <Button onClick={() => router.push('/')} variant="outline" className="mb-4">{"< Back"}</Button>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{poll.question}</h1>
                <div className="flex gap-2">
                    <Button
                        onClick={handleEdit}
                        variant="outline"
                        className="min-w-[100px]"
                    >
                        Edit Poll
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="danger"
                        className="min-w-[100px]"
                        disabled={deleting}
                    >
                        Delete Poll
                    </Button>
                </div>
            </div>
            <PollOptions options={poll.options} onVote={handleVote} />
            <PollResults poll={poll} />
        </Layout>
    );
};

export default PollDetail;