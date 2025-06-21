import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from '../components/home/Home';

function Completedtask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get("/api/task/completedtask", {
            withCredentials: true, 
          });

        if (response.data.status?.success) {
          setTasks(response.data.status.data);
        } else {
          setError("Failed to fetch completed tasks.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  if (loading) return <p>Loading completed tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Home tasks={tasks} />
    </div>
  );
}

export default Completedtask;
