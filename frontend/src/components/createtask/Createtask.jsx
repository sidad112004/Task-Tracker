import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Container from '../container/Container.jsx';

function Createtask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async () => {
    if (!title || !description) {
      toast.error('Title and Description are required');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        '/api/task/createtask',
        { title, description },
        { withCredentials: true }
      );

      if (res?.data?.status?.success) {
        toast.success('Task created successfully!');
        setTitle('');
        setDescription('');
      } else {
        toast.error(res?.data?.status?.message || 'Failed to create task');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className='text-3xl font-bold text-center my-5 mb-16'>Create Task</h1>

      <div className="hero bg-base-200 shadow-2xl border-2 border-base-300 rounded-2xl md:w-1/2 flex justify-center items-center mx-auto p-10">
        <div className="hero-content flex-col lg:flex-col w-full">
          <label htmlFor="task-title" className="label">
            <span className="label-text">Task Title</span>
          </label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Fix MongoDB connection issue"
            className="input input-lg w-full"
          />

          <label htmlFor="task-description" className="label mt-4">
            <span className="label-text">Task Description</span>
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Check the connection string and server status"
            className="textarea textarea-lg w-full"
          />
        </div>
      </div>

      <div className='flex justify-center items-center mt-5'>
        <button
          onClick={handleCreateTask}
          className="btn btn-primary btn-lg"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </Container>
  );
}

export default Createtask;
