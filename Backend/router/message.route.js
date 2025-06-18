import { Router } from "express";
import { myallMessages,createmessage } from "../controllers/message.controller.js";
const messageroute = Router();

messageroute.route("/message/:messagetrackid").get(myallMessages);

messageroute.route("/message/create/:messagetrackid").post(createmessage);

export default messageroute;