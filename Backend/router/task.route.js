import { Router } from "express";
import authverification from '../middleware/auth.middleware.js';
import {
    createTask,
    alltask,
    mytask,
    activetask,
    notcompletedtask,
    getTask,
    todotask,
    completedtask
} from "../controllers/Task.controller.js";

const taskroute = Router();


taskroute.route("/todotask").get(authverification, todotask);

taskroute.route("/createtask").post(authverification, createTask);

taskroute.route("/alltask").get(authverification, alltask);

taskroute.route("/mytask").get(authverification, mytask);

taskroute.route("/activetask").get(authverification, activetask);

taskroute.route("/notcompletedtask").get(authverification, notcompletedtask);

taskroute.route("/completedtask").get(authverification, completedtask);



taskroute.route("/:taskId").get(authverification, getTask);

export default taskroute;
