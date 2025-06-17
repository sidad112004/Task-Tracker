import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





import userroute from './router/user.route.js';
import taskroute from './router/task.route.js';
import messageroute from './router/message.route.js';



app.use("/api/task", taskroute);
app.use("/api/user", userroute);
app.use("/api/message", messageroute);





app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "Something went wrong";
    
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})


export default app;