import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from '../components/home/Home';

function Notcompletedtask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotCompletedTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/task/notcompletedtask", {
          withCredentials: true, // Include if your backend uses cookies for auth
        });

        if (response.data.status?.success) {
          setTasks(response.data.status.data);
        } else {
          setError("Failed to fetch not completed tasks.");
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotCompletedTasks();
  }, []);

  if (loading) return <p>Loading not completed tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Home tasks={tasks} />
    </div>
  );
}

export default Notcompletedtask;
