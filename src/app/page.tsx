import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {PrismaClient} from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function Home() {
  const tasksCount = await prisma.task.count();

  return (
    <div className="grid grid-cols-3 gap-2">
      <Card>
        <CardHeader>Quantidade de Tarefas</CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">{tasksCount}</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Tarefas Concluídas</CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">TBD</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Tarefas Abertas</CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">TBD</span>
        </CardContent>
      </Card>
    </div>
  );
}
