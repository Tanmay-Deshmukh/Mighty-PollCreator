import { useEffect, useState } from 'react';
import PollCard from '../components/PollCard';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { Poll } from '../types/poll';
import { Button } from '../components/ui/Button';
import { apiFetch } from '../utils/api';

const Home = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await apiFetch('/api/polls');
        if (!response.ok) {
          throw new Error('Failed to fetch polls');
        }
        const data: Poll[] = await response.json();
        setPolls(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPolls();
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Available Polls</h1>
        <Button onClick={() => router.push('/create-poll')}>+ Create Poll</Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            onClick={() => router.push(`/polls/${poll.id}`)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Home;