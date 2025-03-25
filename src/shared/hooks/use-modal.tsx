/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';

export interface IOpenModalProps {
  title?: string;
  elementChildren: React.ReactNode;
}

interface IModalState {
  modals: IOpenModalProps[];
}

interface IModalProps {
  openModal: (data: IOpenModalProps) => void;
  closeModal: () => void;
}

const ModalContext = createContext<IModalProps | undefined>(undefined);

const modalReducer = (state: IModalState, action: any): IModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { modals: [...state.modals, action.payload] };
    case 'CLOSE_MODAL':
      return { modals: state.modals.slice(0, -1) };
    default:
      return state;
  }
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(modalReducer, { modals: [] });

  const openModal = useCallback((data: IOpenModalProps) => {
    dispatch({ type: 'OPEN_MODAL', payload: data });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {state.modals.map((itemModal, index) =>
        itemModal.title ? (
          <Dialog open={true} onOpenChange={closeModal} key={index}>
            <DialogContent className='max-w-lg p-6'>
              <DialogHeader>
                <DialogTitle>{itemModal.title}</DialogTitle>
              </DialogHeader>
              {itemModal.elementChildren}
              <DialogClose asChild>
                <Button variant='outline'>Fechar</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ) : (
          itemModal.elementChildren
        ),
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): IModalProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal deve ser usado dentro de um ModalProvider');
  }
  return context;
};
