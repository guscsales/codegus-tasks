import {PrismaClient} from "@prisma/client";
import {DataTable} from "@/components/ui/data-table";
import {tasksDataTableColumns} from "./_components/tasks-data-table-columns";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function TasksPage() {
  const tasks = await prisma.task.findMany();

  return <DataTable columns={tasksDataTableColumns} data={tasks} />;
}
