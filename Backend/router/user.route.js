import {Router} from 'express';
import { singupuser } from '../controllers/user.controller.js';



const userroute= Router();

userroute.route('/signup').post(singupuser);

export default userroute;