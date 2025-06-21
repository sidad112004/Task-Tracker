import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from '../components/home/Home.jsx';

function Todotask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/task/todotask", {
          withCredentials: true, 
        });

        if (response.data.status?.success) {
          setTasks(response.data.status.data);
        } else {
          setError("Failed to fetch tasks.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Home tasks={tasks} />
    </div>
  );
}

export default Todotask;
