import React, { useEffect, useState } from 'react';
import { data, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import Container from '../container/Container';
import DetailSection from './DetailSection';
import DetailHeaderRow from './DetailHeaderRow';
import Conversation from './Conversation';

function Detailtask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // console.log(id)
        const response = await axios.get(`/api/task/${id}`,
          {
            withCredentials: true
          }
        );
        const data=response.data.status.data;
        
        // console.log(data)
        setTask(data);
        if (!data) {
          throw new Error('Task not found');
        }

      } catch (error) {

        console.error(error);

        toast.error('Failed to load task details');
        
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!task) return <p className="text-center py-10 text-red-500">Task not found</p>;

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-center pb-5">Your Task</h1>

      <div className="bg-base-200 border border-base-300 rounded-md overflow-hidden mb-4">
        <DetailHeaderRow label="Title" value={task.title} />
        <DetailHeaderRow label="Status" value={task.status} />
        <DetailHeaderRow label="Priority" value={task.priority} />
        <DetailHeaderRow
          label="Due Date"
          value={new Date(task.dueDate).toLocaleDateString()}
        />
        <DetailHeaderRow
          label="Expertise Required"
          value={task.expertiseReq?.join(', ') || 'N/A'}
        />
        <DetailHeaderRow
          label="Assigned To"
          value={
            task.assignedTo
              ? `${task.assignedTo.name} (${task.assignedTo.email})`
              : 'Unassigned'
          }
        />
      </div>

      <DetailSection title="Description" defaultChecked>
        {task.description || 'No description provided.'}
      </DetailSection>

      <DetailSection title="Helpful Note">
        <p className="whitespace-pre-line">{task.helpfullnote || 'No helpful note.'}</p>
      </DetailSection>

      <DetailSection title="Other Info">
        No additional information.
      </DetailSection>

      <h1 className="font-bold mb-4 text-3xl text-center pt-7">Conversation</h1>
      <Conversation props={task.messagetrackid} />
    </Container>
  );
}

export default Detailtask;
