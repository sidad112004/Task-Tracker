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

---

## 🧪 Sample .env Files

### 🔙 Backend .env
.env

PORT=3000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/Task-Tracker
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
INNGEST_EVENT_KEY=your_inngest_event_key


> Replace <username> and <password> with your MongoDB credentials.

---

## 🚀 How to Run Locally

### 1️⃣ Clone the Repository

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/task-tracker.git
cd task-tracker
\`\`\`

### 2️⃣ Setup & Run Backend

\`\`\`bash
cd backend
npm install
# Add your .env file as shown above
npm run dev
\`\`\`

### 3️⃣ Setup & Run Frontend

\`\`\`bash
cd ../frontend
npm install
npm run dev
\`\`\`

> Frontend runs at: http://localhost:5173

### 4️⃣ Run Inngest Dev Event Handler

From the `backend/` directory:

\`\`\`bash
npx inngest-cli dev --sdk-url=http://localhost:3000/api/inngest
\`\`\`

---

## 📈 Task Flow Example

\`\`\`text
[User] --> [Create Task]
         --> [Inngest AI Agent Triggered]
                  --> [Gemini analyzes and summarizes]
                  --> [Determine Expertise]
                  --> [Assign to Expert + Due Date]
[Expert] --> [View Task & Chat] --> [Complete Task ✅]
[Admin] --> [Handle if Overdue]
\`\`\`

---

## 💡 Future Enhancements

- WebSocket-based real-time chat  
- Email + push notifications  
- Expert performance dashboard  
- User rating system  
- Task filtering & analytics  

---

## 📬 Author

**Siddesh**  
📧 siddhesh112004@example.com  
🔗 [LinkedIn](https://www.linkedin.com/in/siddesh-dhanlobhe-4594b028b/)

---

## 📝 License

This project is licensed under the **MIT License**.