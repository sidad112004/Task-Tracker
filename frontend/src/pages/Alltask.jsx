import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from '../components/home/Home';

function Alltask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get("/api/task/alltask", {
          withCredentials: true, 
        });

        if (response.data.status?.success) {
          setTasks(response.data.status.data);
        } else {
          setError("Failed to fetch all tasks.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, []);

  if (loading) return <p>Loading all tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Home tasks={tasks} />
    </div>
  );
}

export default Alltask;
