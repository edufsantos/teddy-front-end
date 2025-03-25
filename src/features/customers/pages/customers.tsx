import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useModal } from '@/shared/hooks/use-modal';
import { useQueryString } from '@/shared/hooks/use-query-string';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { CustomerDataDialog } from '../components/customer-data-dialog';
import { CustomersListEmptyState } from '../components/customers-list-empty-state';
import { LoaderList } from '../components/customers-loader-list';
import { CustomersPerPage } from '../components/customers-per-page';
import { DeleteCustomerDialog } from '../components/delete-customer-dialog';
import { PaginationCustomers } from '../components/pagination-customers';
import { useDeleteCustomer } from '../hooks/mutations/use-delete-customer';
import { useFindCustomers } from '../hooks/queries/use-find-customers';
import { Customer } from '../models/customer-model';
import { FindCustomersRequest } from '../models/find-customers-request';

const useFindCustomersHandler = () => {
  const [query] = useQueryString<FindCustomersRequest>({
    name: '',
    skip: 0,
    take: 16,
  });
  const { data: customers, isPending, refetch } = useFindCustomers(query);

  return {
    customers,
    isPending,
    refetch,
  };
};

const CustomerPage = () => {
  const { openModal, closeModal } = useModal();

  const { customers, isPending, refetch } = useFindCustomersHandler();
  const { mutate } = useDeleteCustomer();

  if (isPending) {
    return <LoaderList />;
  }

  if (!customers?.rows.length) {
    return <CustomersListEmptyState />;
  }

  const onDelete = (id: number) => {
    openModal({
      title: 'Excluir cliente:',
      elementChildren: (
        <DeleteCustomerDialog
          onClose={closeModal}
          onConfirm={() => {
            mutate(id, {
              onSuccess: () => {
                refetch();
                toast.success('Cliente deletado com sucesso!');
                closeModal();
              },
              onError: () => {
                toast.error('Erro ao deletar cliente!');
              },
            });
          }}
          customerName={customers?.rows.find((c) => c.id === id)?.name ?? ''}
        />
      ),
    });
  };

  const onCustomerData = (customer: Customer | null) => {
    openModal({
      title: !customer ? 'Cadastrar cliente:' : 'Editar cliente:',
      elementChildren: (
        <CustomerDataDialog
          onClose={closeModal}
          customer={customer}
          refetch={refetch}
        />
      ),
    });
  };

  return (
    <div className='p-6'>
      <header className='flex justify-between items-center mb-4'>
        <h2 className='text-lg'>
          <span className='mr-2'>{customers?.count}</span>
          <strong>clientes encontrados:</strong>
        </h2>
        <CustomersPerPage />
      </header>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {customers?.rows.map((customer, index) => (
          <Card key={index} className='p-4'>
            <CardContent>
              <h3 className='font-bold'>{customer.name}</h3>
              <p className='text-sm'>Salário: {customer.salary}</p>
              <p className='text-sm'>Empresa: {customer.company_price}</p>
              <div className='flex justify-between mt-3'>
                <Button variant='ghost' size='icon'>
                  <Plus size={16} />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => onCustomerData(customer)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-red-500'
                  onClick={() => onDelete(customer.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='flex justify-center mt-6'>
        <Button
          variant='outline'
          className='border-orange-500 text-orange-500'
          onClick={() => {
            onCustomerData(null);
          }}
        >
          Cadastrar cliente
        </Button>
      </div>

      <div className='flex justify-center mt-6'>
        <PaginationCustomers count={customers?.count ?? 0} />
      </div>
    </div>
  );
};

export { CustomerPage };
