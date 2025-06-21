import React from 'react';

function Startpage() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex justify-center">
      <div className="w-full max-w-5xl space-y-10">
        
        {/* Hero Section */}
        <div className="hero bg-base-100 shadow-xl rounded-xl p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">🤖 AI-Based Task Tracker</h1>
            <p className="mt-2 text-base-content/70 text-lg">
              An intelligent task management system that connects users with domain experts using AI to solve problems effectively.
            </p>
          </div>
        </div>

        {/* Project Overview */}
        <div className="card bg-base-100 shadow-lg rounded-xl">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-info mb-4">📌 Project Overview</h2>
            <p className="text-base-content/80 leading-relaxed">
              This application helps users submit their real-world problems, which are then analyzed by an AI agent to generate a summary, determine expertise requirements, and assign the task to the most suitable expert. If the expert fails to complete the task by the deadline, it gets escalated to the admin. The system supports communication, task tracking, and role-based access for Users, Experts, and Admins.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="card bg-base-100 shadow-md rounded-xl">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-info mb-4">🧭 How It Works</h2>
            <ul className="space-y-4 text-base leading-relaxed">
              <li>👤 <span className="font-semibold">User Signup/Login:</span> Users register and log in securely.</li>
              <li>📝 <span className="font-semibold">Task Creation:</span> Users create a task with title and description.</li>
              <li>🧠 <span className="font-semibold">AI Task Processing:</span> AI agent analyzes the problem, summarizes it, and generates expertise requirements.</li>
              <li>👨‍💼 <span className="font-semibold">Expert Assignment:</span> The task is automatically assigned to a qualified expert with a due date based on difficulty level.</li>
              <li>💬 <span className="font-semibold">Chat System:</span> Experts and users can communicate. Experts can disable chat to prevent spam.</li>
              <li>⏰ <span className="font-semibold">Due Date Handling:</span> If a task isn't completed on time, it is escalated to the Admin.</li>
              <li>📊 <span className="font-semibold">Role-based Dashboards:</span> 
                <ul className="ml-5 list-disc">
                  <li>Users: Create & view tasks.</li>
                  <li>Experts: View assigned tasks, mark as complete.</li>
                  <li>Admins: Manage all tasks, update users, assign experts.</li>
                </ul>
              </li>
              <li>🔐 <span className="font-semibold">Access Control:</span> Only involved users (creator or assigned expert) can view a task. Admin can view all tasks except private chat.</li>
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="card bg-base-100 shadow-md rounded-xl">
          <div className="card-body text-center">
            <h3 className="text-xl font-semibold text-base-content mb-4">🛠️ Technology Stack</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-primary badge-lg">React (MERN)</span>
              <span className="badge badge-secondary badge-lg">Node.js</span>
              <span className="badge badge-accent badge-lg">MongoDB</span>
              <span className="badge badge-info badge-lg">Redux Toolkit</span>
              <span className="badge badge-success badge-lg">TailwindCSS</span>
              <span className="badge badge-warning badge-lg">DaisyUI</span>
              <span className="badge badge-outline badge-lg">Inngest (AI Event Flow)</span>
              <span className="badge badge-outline badge-lg">Gemini API</span>
              <span className="badge badge-outline badge-lg">Prisma ORM</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Startpage;
