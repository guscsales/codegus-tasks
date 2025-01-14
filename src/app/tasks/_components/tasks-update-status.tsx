"use client";

import {updateTaskStatus} from "@/app/_services/tasks-services";
import {Button} from "@/components/ui/button";
import {TaskStatus} from "@prisma/client";
import {useTransition} from "react";

interface Props {
  taskId: string;
  status: TaskStatus;
}

export default function TasksUpdateStatus({taskId, status}: Props) {
  const [isSaving, startIsSaving] = useTransition();

  function handleUpdateStatus() {
    startIsSaving(async () => {
      await updateTaskStatus(taskId, status);
    });
  }

  return (
    <Button onClick={handleUpdateStatus} variant="outline">
      {isSaving
        ? "Alterando..."
        : status === TaskStatus.IN_PROGRESS
          ? "Concluir"
          : "Reabrir"}
    </Button>
  );
}
