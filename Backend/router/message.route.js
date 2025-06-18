import { Router } from "express";
import { myallMessages,createmessage ,chatactive} from "../controllers/message.controller.js";


const messageroute = Router();



messageroute.route("/message/:messagetrackid").get(myallMessages);

messageroute.route("/message/create").post(createmessage);

messageroute.route("/message/chatactive").post(chatactive);



export default messageroute;