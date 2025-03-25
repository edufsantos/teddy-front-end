import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';

export interface DeleteCustomerDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  customerName: string;
}

const DeleteCustomerDialog = (props: DeleteCustomerDialogProps) => {
  const { onClose, onConfirm, customerName } = props;

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir cliente:</DialogTitle>
        </DialogHeader>
        <p>
          Você está prestes a excluir o cliente:
          <strong>{customerName}</strong>
        </p>
        <DialogFooter>
          <Button className='bg-red-500 text-white' onClick={onConfirm}>
            Excluir cliente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DeleteCustomerDialog };
