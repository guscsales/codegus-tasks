import {z} from "zod";

export const newTaskFormSchema = z.object({
  title: z.string().min(1, {message: "Campo obrigatório"}),
  dueDate: z
    .string()
    .refine(
      (dateString: string) => {
        if (!dateString) return true;

        return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(
          dateString
        );
      },
      {
        message: "Data inválida",
      }
    )
    .refine(
      (dateString: string) => {
        if (!dateString) return true;

        const [day, month, year] = dateString.split("/").map(Number);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();

        return inputDate > today;
      },
      {
        message: "Data deve ser maior que a data atual",
      }
    )
    .optional(),
  description: z.string().min(1, {message: "Campo obrigatório"}),
});

export type NewTaskFormData = z.infer<typeof newTaskFormSchema>;
