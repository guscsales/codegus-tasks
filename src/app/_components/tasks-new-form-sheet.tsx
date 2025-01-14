"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {Textarea} from "@/components/ui/textarea";
import {useForm} from "react-hook-form";
import {
  NewTaskFormData,
  newTaskFormSchema,
} from "@/app/_validators/tasks-validators";
import {createTask} from "@/app/_services/tasks-services";
import {useState, useTransition} from "react";
import {zodResolver} from "@hookform/resolvers/zod";

interface Props {
  trigger: React.ReactNode;
}

export default function TasksNewFormSheet({trigger}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormSchema),
  });
  const [isSaving, startIsSaving] = useTransition();

  function onSubmit(data: NewTaskFormData) {
    startIsSaving(async () => {
      try {
        await createTask(data);
        setIsOpen(false);
      } catch (e) {
        try {
          const errors = JSON.parse(
            (e as Error).toString().replace("Error: ", "")
          );
          console.error(errors);
        } catch{
          console.error(e);
        }

        alert("Erro ao criar tarefa");
      }
    });
  }

  function handleReset() {
    form.reset();
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger onClick={handleReset} asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>Criar Tarefa</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col gap-0.5">
              <Input placeholder="Título" {...form.register("title")} />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <Input
                placeholder="Data de Vencimento"
                {...form.register("dueDate")}
              />
              {form.formState.errors.dueDate && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.dueDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <Textarea
                placeholder="Descrição"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
          </div>
          <footer className="flex justify-end mt-2">
            <Button disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </footer>
        </form>
      </SheetContent>
    </Sheet>
  );
}
