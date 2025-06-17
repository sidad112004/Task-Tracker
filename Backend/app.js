import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());


import userroute from './router/user.route.js';
import taskroute from './router/task.route.js';
import messageroute from './router/message.route.js';


app.use("/api/task", taskroute);
app.use("/api/user", userroute);
app.use("/api/message", messageroute);


export default app;