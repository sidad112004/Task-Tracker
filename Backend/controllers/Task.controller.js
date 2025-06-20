import Asynchandler from "../utils/Asynchandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../prismaClient.js";
import ApiRespoance from "../utils/ApiResponse.js";
import inngest from "../inngest/client.js";
import { now } from "mongoose";


const createTask = Asynchandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title, description, and due date are required");
    }
    const newtask = await prisma.task.create({
        data: {
            title,
            description,
            createdById: req.user.id.toString(),
            dueDate: new Date(now() + 3 * 24 * 60 * 60 * 1000)
        },
    });

    if (!newtask) {
        throw new ApiError(500, "Failed to create task");
    }

    await inngest.send({
        name: "task/created",

        data: {
            taskid: newtask.id
        }
    })

    const finaltask = await prisma.task.findUnique({
        where: {
            id: newtask.id
        }
    });

    if (!finaltask) {
        throw new ApiError(404, "Task not found after creation");
    }



    return res
        .status(201)
        .json(new ApiRespoance({
            success: true,
            message: "Task created successfully",
            data: finaltask
        }));
})



const alltask = Asynchandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id.toString()
        }
    })

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isAdmin = user.role === "ADMIN";

    if (!isAdmin) {
        throw new ApiError(403, "You do not have permission to view all tasks");
    }

    const tasks = await prisma.task.findMany({});

    if (tasks.length === 0) {
        throw new ApiError(404, "No tasks found");
    }

    return res
        .status(200)
        .json(new ApiRespoance({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks
        }))
})



const mytask = Asynchandler(async (req, res) => {


    const tasks = await prisma.task.findMany({
        where: {
            createdById: req.user.id.toString()
        }
    })


    if (tasks.length === 0) {
        throw new ApiError(404, "No tasks found for this user");
    }

    return res
        .status(200)
        .json(new ApiRespoance({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks
        }))
})



const activetask = Asynchandler(async (req, res) => {

    const tasks = await prisma.task.findMany({
        where: {
            status: "INPROGRESS",
            createdById: req.user.id.toString()
        }
    })

     if(!tasks){
        throw new ApiError(404, "No active tasks found for this user");
     }


    return res
        .status(200)
        .json(new ApiRespoance({
            success: true,
            message: "Active tasks fetched successfully",
            data: tasks
        }))
})

const todotask = Asynchandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id.toString()
        }
    });
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role !== "EXPERT") {
        throw new ApiError(403, "Only experts can view TODO tasks");
    }

    const tasks = await prisma.task.findMany({

        where: {
            assignedToId: req.user.id.toString(),
            status:"INPROGRESS"
        }

    });

    if (!tasks) {
        throw new ApiError(404, "No TODO tasks found");
    }

    return res
        .status(200)
        .json(new ApiRespoance({
            success: true,
            message: "TODO tasks fetched successfully",
            data: tasks
        }));
})

const completedtask = Asynchandler(async (req, res) => {
     const user = await prisma.user.findUnique({
        where: {
            id: req.user.id.toString()
        }
    });

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role !== "EXPERT") {
        throw new ApiError(403, "Only experts can view completed tasks");
    }

    const tasks = await prisma.task.findMany({
        where: {
            
            assignedToId: req.user.id.toString(),
            status:"COMPLETED"
        }
    });     

    if (!tasks) {
        throw new ApiError(404, "No completed tasks found for this user");
    }

    return res
        .status(200)
        .json(new ApiRespoance({
            success: true,
            message: "Completed tasks fetched successfully",
            data: tasks
        }));
})

const notcompletedtask = Asynchandler(async (req, res) => {


    const admin = await prisma.user.findUnique({
        where: {
            id: req.user.id.toString()
        }
    });



    if (!admin || admin.role !== "ADMIN") {
        throw new ApiError(403, "Only admin can update overdue tasks");
    }



    const currentDate = new Date();

    const overdueTasks = await prisma.task.findMany({
        where: {
            dueDate: {
                lt: currentDate
            },
            status: {
                in: ["INPROGRESS"]
            }
        }
    });


    const updatePromises = overdueTasks.map(task =>
        prisma.task.update({
            where: { id: task.id },
            data: { status: "EXTENDED"  }
        })
    );

    
    await Promise.all(updatePromises);


    const changeexpert =  overdueTasks.map(task => {
        const messageTracker = prisma.messageTracker.findFirst({
            where: {
                taskId: task.id,
            },
        });
        const updatedmessageTracker = prisma.messageTracker.update({
            where:{
                id: messageTracker.id
            },
            data:{
                expertId:req.user.id.toString()
            }
        })
    })
    
    await Promise.all(changeexpert);


    return res
        .status(200)
        .json(new ApiRespoance({
            success: true,
            message: "Overdue tasks updated to NOTCOMPLETED successfully",
            data: overdueTasks
        }));

});

const getTask = Asynchandler(async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        throw new ApiError(400, "Task ID is required");
    }

    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: task.assignedToId.toString()
        }
    })

    if (!user) {
        throw new ApiError(404, "User not found for the assigned task");
    }
    const messageTracker = await prisma.messageTracker.findFirst({
        where: {
            taskId: task.id,
        },
    });

    const completetask = {
        ...task,
        assignedTo: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        messagetrackid: messageTracker.id
    };
    return res
        .status(200)
        .json(new ApiRespoance({
            success: true,
            message: "Task fetched successfully",
            data: completetask
        }));
})

export { createTask, alltask, mytask, activetask, notcompletedtask, getTask , todotask, completedtask };