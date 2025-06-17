import Asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../prismaClient.js";
import ApiRespoance from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const singupuser=Asynchandler(async (req,res)=>{
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        throw new ApiError(400,"Please provide all fields");
    }

    const existingUser=await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(existingUser){
        
        throw new ApiError(400,"Email already exists");
    }

    const hashedpassword=await bcrypt.hash(password,10);


    if(!hashedpassword){
        throw new ApiError(500,"Password hashing failed");
    }


    const user=await prisma.user.create({
        data:{
            name,
            email,
            password:hashedpassword
        }
    })
    
    if(!user){
        throw new ApiError(500,"User not created");
    }

    res
    .status(201)
    .json(new ApiRespoance(201,user, "User created successfully"));

})

export { singupuser };