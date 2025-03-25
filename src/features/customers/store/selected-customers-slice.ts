import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Customer } from '@/features/customers/models/customer-model';
import { Config } from '@/shared/constants/config';

type SelectedCustomersStore = {
  customers: Customer[];
  findCustomer: (id: number) => Customer | undefined;
  setCustomerToList: (customer: Customer) => void;
  removeCustomerFromList: (id: number) => void;
  clearAllCustomers: () => void;
};

export const useSelectedCustomersStore = create<SelectedCustomersStore>()(
  persist(
    (set, get) => ({
      customers: [],
      findCustomer: (id: number) =>
        get().customers.find((customer) => customer.id === id),
      setCustomerToList: (customer: Customer) =>
        set((state) => {
          if (!state.customers.some((c) => c.id === customer.id)) {
            return { customers: [...state.customers, customer] };
          }
          return state;
        }),
      removeCustomerFromList: (id: number) =>
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id),
        })),
      clearAllCustomers: () => set({ customers: [] }),
    }),
    {
      name: Config.CUSTOMERS_SELECTED,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
