import Asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../prismaClient.js";
import ApiRespoance from "../utils/ApiResponse.js";

const myallMessages = Asynchandler(async (req, res) => {
    const { messagetrackid } = req.params;

    if (!messagetrackid) {
        throw new ApiError(400, "Message track ID is required");
    }

    const messages = await prisma.message.findMany({
        where: {
            messageTrackerId: messagetrackid
        }
    })
    if (!messages || messages.length === 0) {
        throw new ApiError(404, "No messages found for this track ID");
    }
    return res
        .status(200)
        .json(new ApiRespoance({
            success: true,
            message: "Messages fetched successfully",
            data: messages
        }))
})


const createmessage=Asynchandler(async(req,res)=>{
    const { messagetrackid } = req.params;
    const { content } = req.body;
    const messagetrack= await prisma.messageTracker.findUnique({
        where:{
            id: messagetrackid
        }
    })
    if(!messagetrackid){
        throw new ApiError(400, "Message track ID is required");
    }
    if(!content){
        throw new ApiError(400, "Message content is required");
    }
    let to;
    let from;
    if(messagetrack.userId === req.user.id.toString()){
        from =messagetrack.userId;
        to =messagetrack.expertId;
    }
    else{
        from =messagetrack.expertId;
        to =messagetrack.userId;
    }
    const newmessage=await prisma.message.create({
        data :{
            content: content,
            messageTrackerId: messagetrackid,
            fromId: from,
            toId: to

        }
    })

})


export { myallMessages ,createmessage };