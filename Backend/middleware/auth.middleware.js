import Asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const authverification = Asynchandler(async (req, res, next) => {
    try {
        const token = await req.cookies?.Token || req.headers("Authorization")?.replace("Bearer ","");
        if (!token) {
            throw new ApiError(401, "Unauthorized access, please login first");
        }
        const decoded =await jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            throw new ApiError(401, "Token is invalid");
        }
        
        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id
            }
        })

        if (!user) {
            throw new ApiError(404, "User not found");
        }
        
        req.user = user;
        next();

    } catch {
        throw new ApiError(500, "Internal server error, please try again later");
    }

});

export default authverification;