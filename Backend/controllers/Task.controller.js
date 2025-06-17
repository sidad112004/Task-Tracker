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
    

    return res
        .status(201)
        .json(new ApiRespoance({
            success: true,
            message: "Task created successfully",
            data: newtask
        }));
})

export { createTask };