"use server";

import {PrismaClient} from "@prisma/client";
import {
  newTaskFormSchema,
  NewTaskFormData,
} from "@/app/_validators/tasks-validators";
import {revalidatePath} from "next/cache";

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

  const prisma = new PrismaClient();

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
