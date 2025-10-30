import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppContextType } from './types';
import { appReducer, initialState } from './reducer';

const StoreContext = createContext<AppContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue: AppContextType = {
    state,
    dispatch,
  };

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within an AppProvider');
  }
  return context;
}
