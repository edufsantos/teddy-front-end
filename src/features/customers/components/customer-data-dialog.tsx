import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useForm } from 'react-hook-form';
import { Customer } from '../models/customer-model';
import {
  CreateCustomerFormValues,
  useCreateCustomerSchema,
} from '../schemas/create-customer-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { useUpdateCustomer } from '../hooks/mutations/use-update-customer';
import { useCreateCustomer } from '../hooks/mutations/use-create-customer';
import { toast } from 'sonner';

export interface CustomerDataDialogProps {
  onClose: () => void;
  refetch: () => void;
  customer: Customer | null;
}

const useChangeDataCustomerHandler = (
  refetch: () => void,
  onClose: () => void,
  customer: Customer | null,
) => {
  const { mutate: updateCustomer } = useUpdateCustomer();
  const { mutate: createCustomer } = useCreateCustomer();
  const handleUpdateCustomer = (data: CreateCustomerFormValues) => {
    updateCustomer(
      { id: customer!.id, ...data },
      {
        onSuccess: () => {
          refetch();
          toast.success('Cliente atualizado com sucesso!');
          onClose();
        },
        onError: () => {
          toast.error('Erro ao atualizar o cliente!');
        },
      },
    );
  };

  const handleCreateCustomer = (data: CreateCustomerFormValues) => {
    createCustomer(data, {
      onSuccess: () => {
        refetch();
        toast.success('Cliente criado com sucesso!');
        onClose();
      },
      onError: () => {
        toast.error('Erro ao criar o cliente!');
      },
    });
  };

  return { handleUpdateCustomer, handleCreateCustomer };
};

const CustomerDataDialog = (props: CustomerDataDialogProps) => {
  const { onClose, refetch, customer } = props;
  const form = useForm<CreateCustomerFormValues>({
    defaultValues: customer
      ? {
          name: customer.name,
          company_price: customer.company_price,
          salary: customer.salary,
        }
      : {
          name: '',
          company_price: 0,
          salary: 0,
        },
    resolver: zodResolver(useCreateCustomerSchema()),
  });

  const { handleCreateCustomer, handleUpdateCustomer } =
    useChangeDataCustomerHandler(refetch, onClose, customer);

  const handleCustomerSubmit = (data: CreateCustomerFormValues) => {
    if (customer) {
      handleUpdateCustomer(data);
    } else {
      handleCreateCustomer(data);
    }
  };

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {customer ? 'Editar cliente:' : 'Criar cliente:'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCustomerSubmit)}
            className='w-full space-y-6'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='Digite o nome do cliente:' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='salary'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salário</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Digite o salário do cliente:'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='company_price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor da empresa</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Digite o valor da empresa:'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='bg-orange-500 text-white w-full' type='submit'>
              {customer ? 'Editar cliente' : 'Criar cliente'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CustomerDataDialog };
