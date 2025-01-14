"use server";

import {PrismaClient, TaskStatus} from "@prisma/client";
import {
  newTaskFormSchema,
  NewTaskFormData,
} from "@/app/_validators/tasks-validators";
import {revalidatePath} from "next/cache";

const prisma = new PrismaClient();

function convertToISO(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toISOString();
}

export async function createTask(data: NewTaskFormData) {
  const parsedData = newTaskFormSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error(parsedData.error.message);
  }

  await prisma.task.create({
    data: {
      title: parsedData.data.title,
      description: parsedData.data.description,
      dueDate: parsedData.data.dueDate
        ? convertToISO(parsedData.data.dueDate)
        : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/tasks");
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  await prisma.task.update({
    where: {id: taskId},
    data: {
      status:
        status === TaskStatus.IN_PROGRESS
          ? TaskStatus.COMPLETED
          : TaskStatus.IN_PROGRESS,
    },
  });

  revalidatePaths(["/", "/tasks"]);
}

function revalidatePaths(paths: string[]) {
  for (const path of paths) {
    revalidatePath(path);
  }
}
