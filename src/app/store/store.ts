import { create } from 'zustand';

import { useSelectedCustomersStore } from '@/features/customers/store/selected-customers-slice';
import { createJSONStorage, persist } from 'zustand/middleware';

type AppStore = {
  selectedCustomers: ReturnType<typeof useSelectedCustomersStore.getState>;
};

const useAppStore = create<AppStore>()(
  persist(
    () => ({
      selectedCustomers: useSelectedCustomersStore.getState(),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useAppStore };
