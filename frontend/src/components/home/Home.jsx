import React from 'react';
import Container from '../container/Container';
import Taskcard from '../task-card/Taskcard';

function Home() {
  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6 text-center pb-5">Welcome to the Task Manager</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Taskcard />
        <Taskcard />
        <Taskcard />
        <Taskcard />
        <Taskcard />
        <Taskcard />
      </div>
    </Container>
  );
}

export default Home;
