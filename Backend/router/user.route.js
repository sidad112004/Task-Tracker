import {Router} from 'express';
import { singupuser,loginuser ,logoutuser} from '../controllers/user.controller.js';
import authverification from '../middleware/auth.middleware.js';



const userroute= Router();

userroute.route('/signup').post(singupuser);
userroute.route('/login').post(loginuser);
userroute.route('/logout').get(authverification,logoutuser);




export default userroute;