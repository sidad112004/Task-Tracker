import { Router } from "express";
import { myallMessages,createmessage ,chatactive,chatstatus} from "../controllers/message.controller.js";
import authverification from '../middleware/auth.middleware.js';

const messageroute = Router();




messageroute.route("/create").post(authverification,createmessage);

messageroute.route("/chatactive").post(authverification,chatactive);

messageroute.route("/chatstatus").post(authverification,chatstatus)

messageroute.route("/:messagetrackid").get(authverification,myallMessages);



export default messageroute;