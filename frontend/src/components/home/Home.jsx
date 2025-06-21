import React from 'react';
import Container from '../container/Container';
import Taskcard from '../task-card/Taskcard';

function HomePage({ tasks }) {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-center pb-5">Task Manager</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => <Taskcard key={task.id} task={task} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">No tasks found.</div>
        )}
      </div>
    </Container>
  );
}

export default HomePage;
