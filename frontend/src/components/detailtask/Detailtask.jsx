import React from 'react';
import Container from '../container/Container';
import DetailSection from './DetailSection';
import DetailHeaderRow from './DetailHeaderRow';
import Conversation from './Conversation';

const task = {
  id: '6854eb539973b108688ee797',
  title: '1) not able to connect with express and mongo db',
  description: 'connection failed in monogdb and express',
  expertiseReq: ['Node.js', 'MongoDB', 'Express.js'],
  helpfullnote:
    'This indicates a problem with the database connection configuration in the Express.js application. Verify the connection string is correct and that the MongoDB server is running and accessible. Check for common errors such as incorrect username/password, incorrect port number, or network issues. Ensure that necessary drivers are installed and properly imported in the application. Consider logging the connection attempt to pinpoint the source of the failure. Useful resources: [MongoDB Connection String](https://www.mongodb.com/docs/drivers/node/current/usage-examples/connection-string/), [Express.js error handling](https://expressjs.com/en/guide/error-handling.html), and the appropriate MongoDB driver documentation for your Node.js version. Verify the database name and collection name if applicable in your code.',
  status: 'INPROGRESS',
  priority: 'high',
  dueDate: '2025-06-27T05:02:14.533Z',
  assignedTo: {
    id: '68531b96c7ad46fe77c9349e',
    name: 'monodb',
    email: '2',
  },
   messagetrackid: "6854eb579973b108688ee798"
};

function Detailtask() {
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
          value={task.expertiseReq.join(', ')}
        />
        <DetailHeaderRow label="Assigned To" value={`${task.assignedTo.name} (${task.assignedTo.email})`} />
      </div>

      <DetailSection title="Description" defaultChecked>
        {task.description}
      </DetailSection>

      <DetailSection title="Helpful Note">
        <p className="whitespace-pre-line">{task.helpfullnote}</p>
      </DetailSection>

      <DetailSection title="Other Info">
        No additional information.
      </DetailSection>

      <h1 className=" font-bold mb-4 text-3xl text-center pt-7">Conversation</h1>
      <Conversation props={task.messagetrackid} />
    </Container>
  );
}

export default Detailtask;
