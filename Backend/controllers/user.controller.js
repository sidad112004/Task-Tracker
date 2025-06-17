import Asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../prismaClient.js";
import ApiRespoance from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import getJwtToken from "../utils/getjwttoken.js";


const singupuser = Asynchandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "Please provide all fields");
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) {

        throw new ApiError(400, "Email already exists");
    }

    const hashedpassword = await bcrypt.hash(password, 10);


    if (!hashedpassword) {
        throw new ApiError(500, "Password hashing failed");
    }


    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedpassword
        }
    })

    if (!user) {
        throw new ApiError(500, "User not created");
    }

    return res
        .status(201)
        .json(new ApiRespoance(201, user, "User created successfully"));

})


const loginuser = Asynchandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Please provide all fields");
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
   
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const passwordcheck = await bcrypt.compare(password, user.password);

    if (!passwordcheck) {
        throw new ApiError(400, "Invalid credentials");
    }

    const token= await getJwtToken(user.id);
  

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 
    };

    const finaluser = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            id: true,
            name: true,
            email: true
          
        }
    });
    
   return res
     .status(200)
     .cookie("Token",token,options)
     .json(new ApiRespoance(200,  finaluser  , "User logged in successfully"));
            
});



const logoutuser =Asynchandler(async (req,res)=>{
   
    const userid= req.user.id;
    
    if(!userid){
        throw new ApiError(400, "User not found");
    }
    const loginuser=await prisma.user.findUnique({
        where:{
            id:userid
        }
    })
    if(!loginuser){
        throw new ApiError(404, "User not found");
    }
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), 
    };

     return res
        .status(200)
        .clearCookie("Token", options)
        .json(new ApiRespoance(200, null, "User logged out successfully"));

})


export { singupuser, loginuser, logoutuser };