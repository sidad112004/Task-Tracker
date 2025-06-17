import { Router } from "express";
import authverification from '../middleware/auth.middleware.js';
import { createTask } from "../controllers/Task.controller.js";
const taskroute = Router();

taskroute.route("/createtask").post(authverification,createTask);

export default taskroute;