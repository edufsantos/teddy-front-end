import { createContext, ReactNode, useContext } from 'react';

import { useMe } from '@/features/user/hooks/queries/use-me';
import { User } from '@/features/user/models/user-model';

type AuthContextType = {
  user: User | undefined; // Here we can implement a user model to handle user data
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isPending } = useMe(); // Here we can implemnt a useMe service to check if user is authenticated

  // TODO: Change to global component to handle loading state
  if (isPending) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
