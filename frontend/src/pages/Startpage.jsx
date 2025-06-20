import React from 'react';

function Startpage() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex justify-center">
      <div className="w-full max-w-4xl space-y-10">
        
        {/* Hero Section */}
        <div className="hero bg-base-100 shadow-xl rounded-xl p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">🚀 Task Tracker Project</h1>
            <p className="mt-2 text-base-content/70 text-lg">
              A modern task management web app built with the MERN stack and styled using TailwindCSS & DaisyUI.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="card bg-base-100 shadow-lg rounded-xl">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-info mb-4">🧭 How It Works</h2>
            <ul className="space-y-4 text-base leading-relaxed">
              <li>
                🔐 <span className="font-semibold">User Authentication:</span> Users sign up or log in using secure JWT-based authentication.
              </li>
              <li>
                📝 <span className="font-semibold">Create Tasks:</span> After logging in, users can create new tasks by providing a title, description, and due date.
              </li>
              <li>
                📋 <span className="font-semibold">View Task List:</span> All tasks are displayed in a clean, responsive layout. Each task shows its status (Pending, In Progress, Completed).
              </li>
              <li>
                ✏️ <span className="font-semibold">Edit or Update:</span> Users can update task details or change the status directly from the task card.
              </li>
              <li>
                ❌ <span className="font-semibold">Delete Tasks:</span> Tasks can be removed if no longer needed with a simple click.
              </li>
              <li>
                📱 <span className="font-semibold">Responsive UI:</span> Built using TailwindCSS + DaisyUI for a mobile-friendly and elegant interface.
              </li>
              <li>
                🔄 <span className="font-semibold">Real-Time State:</span> Redux Toolkit ensures the UI stays in sync with all changes immediately.
              </li>
              <li>
                🗂️ <span className="font-semibold">Modular Code:</span> Organized using reusable React components and clean folder structures.
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="card bg-base-100 shadow-md rounded-xl">
          <div className="card-body text-center">
            <h3 className="text-lg font-medium text-base-content/70 mb-3">🧰 Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-primary badge-lg">React</span>
              <span className="badge badge-secondary badge-lg">Node.js</span>
              <span className="badge badge-accent badge-lg">MongoDB</span>
              <span className="badge badge-info badge-lg">Redux</span>
              <span className="badge badge-success badge-lg">TailwindCSS</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Startpage;
