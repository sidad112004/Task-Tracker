import dontenv from 'dotenv'
import app from './app.js'

dontenv.config({
    path:"../.env"
})

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("server is running on the port:",port);
})