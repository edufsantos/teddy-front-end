import { z } from 'zod';

const useLoginFormSchema = () => {
  return z.object({
    name: z
      .string()
      .nonempty({ message: 'Nome é obrigatório' })
      .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
      .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
  });
};

type LoginFormValues = z.infer<ReturnType<typeof useLoginFormSchema>>;

export { type LoginFormValues, useLoginFormSchema };
