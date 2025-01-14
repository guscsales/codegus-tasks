"use client";

import {Task, TaskStatus} from "@prisma/client";
import {ColumnDef} from "@tanstack/react-table";
import {format} from "date-fns";
import TasksUpdateStatus from "./tasks-update-status";

export const tasksDataTableColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "dueDate",
    header: "Data de vencimento",
    cell: ({row}) => {
      const dueDate = row.getValue("dueDate") as Date;
      return dueDate ? format(dueDate, "dd/MM/yyyy") : "N/A";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({row}) => {
      const createdAt = row.getValue("createdAt") as Date;
      return createdAt ? format(createdAt, "dd/MM/yyyy") : "N/A";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const status = row.getValue("status") as TaskStatus;
      return status === TaskStatus.IN_PROGRESS ? "Em andamento" : "Concluída";
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({row}) => {
      const {id} = row.original;
      return (
        <TasksUpdateStatus
          taskId={id}
          status={row.getValue("status") as TaskStatus}
        />
      );
    },
  },
];
