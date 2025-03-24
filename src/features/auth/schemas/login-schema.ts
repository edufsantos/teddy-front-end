import { z } from 'zod';

const useLoginFormSchema = () => {
  return z.object({
    name: z.string().nonempty('Name is required'),
  });
};

type LoginFormValues = z.infer<ReturnType<typeof useLoginFormSchema>>;

export { type LoginFormValues, useLoginFormSchema };
