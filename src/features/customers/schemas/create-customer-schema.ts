import { z } from 'zod';

const useCreateCustomerSchema = () => {
  return z.object({
    name: z
      .string()
      .nonempty({ message: 'Nome é obrigatório' })
      .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
      .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
    salary: z.number(),
    company_price: z.number(),
  });
};

type CreateCustomerFormValues = z.infer<
  ReturnType<typeof useCreateCustomerSchema>
>;

export { type CreateCustomerFormValues, useCreateCustomerSchema };
