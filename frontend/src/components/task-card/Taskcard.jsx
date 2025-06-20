import React from 'react';
import { useNavigate } from 'react-router-dom';

function Taskcard({ task }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'badge-success';
      case 'inprogress':
        return 'badge-warning';
      case 'pending':
        return 'badge-neutral';
      default:
        return 'badge-ghost';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-base-content';
    }
  };

  return (
    <div
      className="card bg-base-100 w-full max-w-sm mx-auto shadow-md hover:shadow-xl transition cursor-pointer"
      onClick={() => navigate(`/detailtask/${task.id}`)}
    >
      <div className="card-body space-y-2">
        <h2 className="card-title">{task.title}</h2>
        <p className="text-sm text-base-content/70 line-clamp-3">{task.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className={`badge ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
          <span className={`font-semibold ${getPriorityColor(task.priority)}`}>
            {task.priority.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Taskcard;
