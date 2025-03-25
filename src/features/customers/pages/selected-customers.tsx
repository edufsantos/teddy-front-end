import { Button } from '@/shared/components/ui/button';
import { CustomerCard } from '../components/customer-card';
import { CustomersListEmptyState } from '../components/customers-list-empty-state';
import { Variant } from '../models/customer-card';
import { useSelectedCustomersStore } from '../store/selected-customers-slice';

const SelectedCustomersPage = () => {
  const { customers, clearAllCustomers } = useSelectedCustomersStore();

  if (!customers?.length) {
    return (
      <CustomersListEmptyState refetch={() => {}} canCreateCustomer={false} />
    );
  }

  return (
    <div className='p-6'>
      <header className='flex justify-between items-center mb-4'>
        <h2 className='text-lg'>
          Cliente selecionados: {customers?.length ?? 0}
        </h2>
      </header>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            variant={Variant.Selected}
          />
        ))}
      </div>

      <div className='flex justify-center mt-6'>
        <Button
          variant='outline'
          className='border-orange-500 text-orange-500'
          onClick={() => {
            clearAllCustomers();
          }}
        >
          Limpar clientes selecionados
        </Button>
      </div>
    </div>
  );
};

export { SelectedCustomersPage };
