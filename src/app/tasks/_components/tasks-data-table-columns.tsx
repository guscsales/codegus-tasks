"use client";

import {Task} from "@prisma/client";
import {ColumnDef} from "@tanstack/react-table";
import {format} from "date-fns";

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
];
