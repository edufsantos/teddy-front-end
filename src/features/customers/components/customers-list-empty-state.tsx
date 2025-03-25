import { Button } from '@/shared/components/ui/button';

const CustomersListEmptyState = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='text-gray-500 text-center'>
        <h3 className='text-lg font-bold'>Nenhum cliente encontrado</h3>
        <p className='text-sm'>
          Tente ajustar os filtros ou adicionar novos clientes.
        </p>
      </div>
      <Button
        variant='outline'
        className='mt-4'
        onClick={() => console.log('Criar cliente')}
      >
        Criar cliente
      </Button>
    </div>
  );
};

export { CustomersListEmptyState };
