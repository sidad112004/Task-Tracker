# 🤖 AI-Based Task Tracker

An AI-powered task management system that combines human expertise with artificial intelligence to intelligently handle problem reporting, task assignment, and expert-user collaboration.

---

## 🎥 Demo Video

📺 Watch the demo:  
🔗 [YouTube Demo](https://www.youtube.com/watch?v=YOUR_VIDEO_LINK)

---

## 📌 Problem Statement

In real-world service environments, users often encounter issues that require help from domain experts. However, managing tasks manually becomes chaotic — especially when assigning experts, tracking task progress, handling overdue issues, or facilitating communication.

---

## ✅ Solution: AI-Based Task Tracker

This application solves that problem by combining a modern task management interface with an **AI Agent (Gemini + Inngest)** to:

- Analyze user-reported problems.
- Generate a summarized note.
- Determine and assign the correct expert.
- Define a due date based on task complexity.
- Track task progress.
- Escalate to admin if expert fails to complete.

---

## 📂 Key Features by Role

### 👤 User
- Signup/Login using secure JWT authentication.
- Create new tasks with title and detailed description.
- View "My Tasks" (Active, Completed).
- Chat with assigned expert (if chat enabled).
- View task status and due dates.

### 🧑‍🔧 Expert
- View assigned tasks only.
- See "To Do" and "Completed" tabs.
- Communicate with users via in-app messaging.
- Enable/Disable chat (prevents unnecessary spam).
- Mark tasks as completed.

### 🧑‍💼 Admin
- View all tasks in the system.
- Manage overdue tasks.
- Promote users to expert and assign skillsets.
- Cannot view expert-user chat (for privacy).
- Add new experts via dashboard.

---

## ⚙️ How the AI Works

When a user creates a task:

1. 🔁 The task is sent to the Inngest AI Event system.
2. 🧠 Gemini AI analyzes the description and:
   - Creates a meaningful summary (`usefulNote`).
   - Identifies which **expertise** is required.
   - Automatically sets priority level: `Low`, `Medium`, or `High`.
   - Assigns to available expert matching that skill.
   - Sets a due date based on complexity.
3. 👨‍🔧 Expert is notified and given task.
4. 🕓 If the due date passes, the task gets flagged for admin.

---

## 🧑‍💻 Technologies Used

### 🔙 Backend
- Node.js + Express
- MongoDB + Prisma ORM
- JWT Authentication
- Inngest (Event Management)
- Gemini API (Google AI)

### 🌐 Frontend
- React.js
- Tailwind CSS + DaisyUI
- Redux Toolkit

---

## 📁 Project Folder Structure

```bash
task-tracker/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── inngest/
│   ├── prisma/
│   ├── utils/
│   ├── middleware/
│   ├── .env
│   ├── app.js
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env
