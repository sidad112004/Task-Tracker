import { Router } from "express";
import { myallMessages,createmessage ,chatactive} from "../controllers/message.controller.js";
import authverification from '../middleware/auth.middleware.js';

const messageroute = Router();



messageroute.route("/:messagetrackid").get(authverification,myallMessages);

messageroute.route("/create").post(authverification,createmessage);

messageroute.route("/chatactive").post(authverification,chatactive);



export default messageroute;