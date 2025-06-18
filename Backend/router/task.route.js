import { Router } from "express";
import authverification from '../middleware/auth.middleware.js';
import { createTask ,alltask,mytask,activetask,notcompletedtask } from "../controllers/Task.controller.js";
const taskroute = Router();


taskroute.route("/createtask").post(authverification,createTask);

taskroute.route("/alltask").get(authverification,alltask);

taskroute.route("/mytask").get(authverification,mytask);

taskroute.route("/activetask").get(authverification,activetask);

taskroute.route("/notcompletedtask").get(authverification,notcompletedtask);


export default taskroute;