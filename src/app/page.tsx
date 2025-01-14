import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {DataTable} from "@/components/ui/data-table";
import {PrismaClient, TaskStatus} from "@prisma/client";
import {tasksDataTableColumns} from "./tasks/_components/tasks-data-table-columns";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function Home() {
  const tasksCount = await prisma.task.count();
  const tasksInProgressCount = await prisma.task.count({
    where: {
      status: TaskStatus.IN_PROGRESS,
    },
  });
  const tasksCompletedCount = await prisma.task.count({
    where: {
      status: TaskStatus.COMPLETED,
    },
  });
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <Card>
          <CardHeader>Total</CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">{tasksCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Abertas</CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">{tasksInProgressCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Concluídas</CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">{tasksCompletedCount}</span>
          </CardContent>
        </Card>
      </div>

      <section className="mt-5">
        <DataTable columns={tasksDataTableColumns} data={tasks} />
      </section>
    </>
  );
}
