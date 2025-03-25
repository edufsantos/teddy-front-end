import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Customer } from '../models/customer-model';
import { Minus, Pencil, Plus, Trash2 } from 'lucide-react';
import { useSelectedCustomersStore } from '../store/selected-customers-slice';
import { Variant } from '../models/customer-card';

interface ICustomerCardBaseProps {
  customer: Customer;
  variant: Variant;
}

interface ISelectedCustomerCardProps extends ICustomerCardBaseProps {
  variant: Variant.Selected;
}

interface IDefaultCustomerCardProps extends ICustomerCardBaseProps {
  variant: Variant.Default;
  onCustomerData: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

type ICustomerCardProps =
  | ISelectedCustomerCardProps
  | IDefaultCustomerCardProps;

const CustomerCard = (props: ICustomerCardProps) => {
  const { findCustomer, removeCustomerFromList, setCustomerToList } =
    useSelectedCustomersStore();

  const footer = {
    [Variant.Selected]: (
      <div className='flex justify-end mt-3'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => removeCustomerFromList(props.customer.id)}
        >
          <Minus size={16} />
        </Button>
      </div>
    ),
    [Variant.Default]: (
      <div className='flex justify-between mt-3'>
        {findCustomer(props.customer.id) ? (
          <Button
            variant='ghost'
            size='icon'
            className='text-red-500 '
            onClick={() => removeCustomerFromList(props.customer.id)}
          >
            <Minus size={16} />
          </Button>
        ) : (
          <Button
            variant='ghost'
            size='icon'
            className='text-green-500 '
            onClick={() => setCustomerToList(props.customer)}
          >
            <Plus size={16} />
          </Button>
        )}
        <Button
          variant='ghost'
          size='icon'
          onClick={() =>
            'onCustomerData' in props && props.onCustomerData(props.customer)
          }
        >
          <Pencil size={16} />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='text-red-500'
          onClick={() =>
            'onDelete' in props && props.onDelete(props.customer.id)
          }
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  };

  return (
    <Card className='p-6'>
      <div className='text-center'>
        <h3 className='font-bold'>{props.customer.name}</h3>
        <p className='text-sm'>Salário: {props.customer.salary}</p>
        <p className='text-sm'>Empresa: {props.customer.company_price}</p>
      </div>
      {footer[props.variant]}
    </Card>
  );
};

export { CustomerCard };
