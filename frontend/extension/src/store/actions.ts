import type { AppAction, User } from './types';
import type { TAutomationFormValues } from '../pages/CreateAutomation/formSchema';

// Action creators
export const actions = {
  // Loading actions
  setLoading: (isLoading: boolean): AppAction => ({
    type: 'SET_LOADING',
    payload: isLoading,
  }),

  // User actions
  setUser: (user: User | null): AppAction => ({
    type: 'SET_USER',
    payload: user,
  }),

  setAuthenticated: (isAuthenticated: boolean): AppAction => ({
    type: 'SET_AUTHENTICATED',
    payload: isAuthenticated,
  }),

  // Automation actions
  setAutomations: (automations: TAutomationFormValues[]): AppAction => ({
    type: 'SET_AUTOMATIONS',
    payload: automations,
  }),

  addAutomation: (automation: TAutomationFormValues): AppAction => ({
    type: 'ADD_AUTOMATION',
    payload: automation,
  }),

  updateAutomation: (index: number, automation: TAutomationFormValues): AppAction => ({
    type: 'UPDATE_AUTOMATION',
    payload: { index, automation },
  }),

  deleteAutomation: (index: number): AppAction => ({
    type: 'DELETE_AUTOMATION',
    payload: index,
  }),

  setCurrentAutomation: (automation: TAutomationFormValues | null): AppAction => ({
    type: 'SET_CURRENT_AUTOMATION',
    payload: automation,
  }),

  clearCurrentAutomation: (): AppAction => ({
    type: 'CLEAR_CURRENT_AUTOMATION',
  }),

  // App state actions
  setTheme: (theme: 'light' | 'dark' | 'system'): AppAction => ({
    type: 'SET_THEME',
    payload: theme,
  }),

  setOnline: (isOnline: boolean): AppAction => ({
    type: 'SET_ONLINE',
    payload: isOnline,
  }),

  setError: (error: string | null): AppAction => ({
    type: 'SET_ERROR',
    payload: error,
  }),

  clearError: (): AppAction => ({
    type: 'CLEAR_ERROR',
  }),

  resetState: (): AppAction => ({
    type: 'RESET_STATE',
  }),
};
