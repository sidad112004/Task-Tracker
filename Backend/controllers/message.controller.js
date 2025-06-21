import Asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../prismaClient.js";
import ApiRespoance from "../utils/ApiResponse.js";

const myallMessages = Asynchandler(async (req, res) => {
    const { messagetrackid } = req.params;

    if (!messagetrackid) {
        throw new ApiError(400, "Message track ID is required");
    }
    const messagetrack = await prisma.messageTracker.findUnique({
        where: {
            id: messagetrackid.toString()
        }
    });

    if(messagetrack.userId !== req.user.id && messagetrack.expertId !== req.user.id){
        throw new ApiError(403, "You are not authorized to view this conversation");    

    }
    
    const messages = await prisma.message.findMany({
        where: {
            messageTrackerId: messagetrackid.toString()
        }
    })

    if (!messages ) {
        throw new ApiError(404, "No messages found for this track ID");
    }
    return res
        .status(200)
        .json(new ApiRespoance({
            status: true,
            message: "Messages fetched successfully",
            data: messages
        }))
})


const createmessage=Asynchandler(async(req,res)=>{
   
    const { content,messagetrackid } = req.body;

    

    if(!messagetrackid){
        throw new ApiError(400, "Message track ID is required");
    }

    if(!content){
        throw new ApiError(400, "Message content is required");
    }
   
    const messagetrack= await prisma.messageTracker.findUnique({
        where:{
            id: messagetrackid
        }
    })
    


    if(!messagetrack){
        throw new ApiError(404, "Message track not found");
    }

    if(messagetrack.chatActive === false){
        throw new ApiError(403, "Chat is not active.");
    }

    let to;
    let from;
   
      
    if(messagetrack.userId.toString() === req.user.id.toString()){
        from =messagetrack.userId.toString();
        to =messagetrack.expertId.toString();
    }
    else{
        from =messagetrack.expertId.toString();
        to =messagetrack.userId.toString();
    }

    

    const newmessage=await prisma.message.create({
        data :{
            content: content,
            messageTrackerId: messagetrackid,
            fromId: from,
            toId: to

        }
    })
    return res
        .status(201)
        .json(new ApiRespoance({
        success: true,
        message: "Message created successfully",
        data: newmessage
    }))

})


const chatactive=Asynchandler(async (req,res)=>{

    const {messagetrackid,val} = req.body;
   
    if(val !== true && val !== false){
        throw new ApiError(400, "Invalid value for chat active status");
    }

    if (!messagetrackid) {
        throw new ApiError(400, "Message track ID is required");
    }

    const user= await prisma.user.findUnique({
        where: {
            id: req.user.id.toString()
        }
    })
    
    if(user.role === "USER"){
        throw new ApiError(403, "Only expert and admin can update chat active status");
    }
    
    const messagetrack = await prisma.messageTracker.findUnique({
        where: {
            id: messagetrackid
        }
    })

    
    if (!messagetrack) {
        throw new ApiError(404, "Message track not found");
    }
    
    if(messagetrack.expertId.toString() !== req.user.id.toString()){
        throw new ApiError(403, "You are not authorized to update this message track");
    }
    

    
        await prisma.messageTracker.update({
            where: {
                id: messagetrackid
            },
            data: {
                chatActive: val
            }   
        })
    
    

    return res.status(200).json(new ApiRespoance({
        success: true,
        message: "Chat active status updated successfully",
        data: messagetrack
    }))

})

const chatstatus=Asynchandler(async (req,res)=>{
    
    const {messagetrackid} = req.body;
   

    if (!messagetrackid) {
        throw new ApiError(400, "Message track ID is required");
    }

    const user= await prisma.user.findUnique({
        where: {
            id: req.user.id.toString()
        }
    })
    
    if(user.role === "USER"){
        throw new ApiError(403, "Only expert and admin can update chat active status");
    }
    
    const messagetrack = await prisma.messageTracker.findUnique({
        where: {
            id: messagetrackid
        }
    })

    
    if (!messagetrack) {
        throw new ApiError(404, "Message track not found");
    }
    

    return res.status(200).json(new ApiRespoance({
        success: true,
        message: "Chat active status updated successfully",
        data: messagetrack
    }))

})

export { myallMessages ,createmessage ,chatactive, chatstatus };