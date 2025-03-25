import { Button } from '@/shared/components/ui/button';
import { useModal } from '@/shared/hooks/use-modal';
import { CustomerDataDialog } from './customer-data-dialog';

export interface ICustomersListEmptyStateProps {
  refetch: () => void;
  canCreateCustomer?: boolean;
}

const CustomersListEmptyState = ({
  refetch,
  canCreateCustomer = true,
}: ICustomersListEmptyStateProps) => {
  const { openModal, closeModal } = useModal();

  const onCustomerData = () => {
    openModal({
      title: 'Cadastrar cliente:',
      elementChildren: (
        <CustomerDataDialog
          onClose={closeModal}
          customer={null}
          refetch={refetch}
        />
      ),
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='text-gray-500 text-center'>
        <h3 className='text-lg font-bold'>Nenhum cliente encontrado</h3>
        <p className='text-sm'>
          Tente ajustar os filtros ou adicionar novos clientes.
        </p>
      </div>
      {canCreateCustomer && (
        <Button
          variant='outline'
          className='mt-4'
          onClick={() => onCustomerData()}
        >
          Criar cliente
        </Button>
      )}
    </div>
  );
};

export { CustomersListEmptyState };
