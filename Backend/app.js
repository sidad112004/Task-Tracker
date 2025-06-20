import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { serve } from "inngest/express";
import { taskCreate } from "./inngest/functions/on-task-create.js";
import  inngest  from "./inngest/client.js"; 
const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
import userroute from './router/user.route.js';
import taskroute from './router/task.route.js';
import messageroute from './router/message.route.js';

app.use("/api/task", taskroute);
app.use("/api/user", userroute);
app.use("/api/message", messageroute);

// Inngest event function handler
app.use("/api/inngest", serve({
  client: inngest,
  functions: [taskCreate],
}));

// Error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

export default app;
