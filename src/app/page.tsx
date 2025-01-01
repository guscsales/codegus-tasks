import TasksNewFormSheet from "@/app/_components/tasks-new-form-sheet";
import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-lg font-bold">Codegus Tasks</h1>
      <TasksNewFormSheet trigger={<Button>Criar</Button>} />
    </header>
  );
}
