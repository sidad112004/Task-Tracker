import { inngest } from '../client.js'
import { NonRetriableError } from 'inngest'
import prisma from "../../prismaClient.js"
import analyzeticket from '../../utils/ai.js'


const taskCreate = inngest.createFunction(
    { id: 'task/create', retries: 2 },
    { event: 'task/created' },

    async ({ event, step }) => {
        try {
            const { taskid } = event.data;

            const task = await step.run("fetch-task", async () => {
                const taskobject = await prisma.task.findUnique({
                    where: { id: taskid }
                });

                if (!taskobject) {
                    throw new NonRetriableError(`Task with id ${taskid} not found`);
                }

                return taskobject;
            });

            const airesp = await analyzeticket(task);

            const relatedSkills = await step.run("update-task", async () => {
                let skill = [];
                if (airesp) {

                    const priority = ["low", "medium", "high"].includes(airesp.priority)
                        ? airesp.priority
                        : "medium";


                    let dueDate = new Date();
                    if (priority === "low") {
                        dueDate.setDate(dueDate.getDate() + 3);
                    } else if (priority === "medium") {
                        dueDate.setDate(dueDate.getDate() + 5);
                    } else if (priority === "high") {
                        dueDate.setDate(dueDate.getDate() + 7);
                    }

                    await prisma.task.update({
                        where: { id: taskid },
                        data: {
                            priority: priority,
                            helpfullnote: airesp.helpfulNotes,
                            status: "INPROGRESS",
                            expertiseReq: airesp.relatedSkills ?? [],
                            dueDate: dueDate
                        }
                    });
                    skill = airesp.relatedSkills;
                }
                return skill;
            });



            const moderator = await step.run("assign-moderator", async () => {
                
                const experts = await prisma.user.findMany({
                    where: {
                        role: "EXPERT",
                        taskCapacity: { gt: 0 },
                    },
                });

                let bestExpert = null;
                let maxMatchCount = 0;

                for (const expert of experts) {
                    const matchCount = expert.skill.filter(skill =>
                        relatedSkills.includes(skill)
                    ).length;

                    if (matchCount > maxMatchCount) {
                        bestExpert = expert;
                        maxMatchCount = matchCount;
                    }
                }

                let assignedUserId = null;

                if (bestExpert) {
                    assignedUserId = bestExpert.id;

                    await prisma.user.update({
                        where: { id: bestExpert.id },
                        data: {
                            taskCapacity: { decrement: 1 },
                        },
                    });
                } else {
                   
                    const admin = await prisma.user.findFirst({
                        where: {
                            role: "ADMIN",
                        },
                    });

                    if (admin) {
                        assignedUserId = admin.id;
                    }
                }

                await prisma.task.update({
                    where: { id: task.id }, 
                    data: {
                        assignedToId: assignedUserId,
                    },
                });
                const user = await prisma.user.findUnique({
                    where: { id: assignedUserId }
                });
                
                return user;
                
            })
          


        } catch (error) {

        }
    }

)