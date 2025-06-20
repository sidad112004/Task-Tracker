import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from '../components/home/Home';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/task/mytask', { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (data?.status?.success) {
          setTasks(data.status.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return <HomePage tasks={tasks} />;
}

export default Home;
