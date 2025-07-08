import type { TAutomationFormValues } from '../pages/CreateAutomation/formSchema';

// User types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

// App state interface
export interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Automation state
  automations: TAutomationFormValues[];
  currentAutomation: TAutomationFormValues | null;

  // App state
  theme: 'light' | 'dark' | 'system';
  isOnline: boolean;
  error: string | null;
}

// Action types
export type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_AUTOMATIONS'; payload: TAutomationFormValues[] }
  | { type: 'ADD_AUTOMATION'; payload: TAutomationFormValues }
  | { type: 'UPDATE_AUTOMATION'; payload: { index: number; automation: TAutomationFormValues } }
  | { type: 'DELETE_AUTOMATION'; payload: number }
  | { type: 'SET_CURRENT_AUTOMATION'; payload: TAutomationFormValues | null }
  | { type: 'CLEAR_CURRENT_AUTOMATION' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SET_ONLINE'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET_STATE' };

// Store context type
export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}
