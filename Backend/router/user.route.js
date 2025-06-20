import {Router} from 'express';
import { singupuser,loginuser ,logoutuser,updateuserbyadmin,getuser} from '../controllers/user.controller.js';
import authverification from '../middleware/auth.middleware.js';



const userroute= Router();

userroute.route('/signup').post(singupuser);


userroute.route('/login').post(loginuser);


userroute.route('/logout').get(authverification,logoutuser);


userroute.route('/updatebyadmin').put(authverification,updateuserbyadmin);

userroute.route('/getuser').get(authverification,getuser);




export default userroute;