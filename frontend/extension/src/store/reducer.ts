import type { AppState, AppAction } from './types';

// Initial state
export const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  automations: [],
  currentAutomation: null,
  theme: 'system',
  isOnline: navigator.onLine,
  error: null,
};

// Reducer function
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };

    case 'SET_AUTOMATIONS':
      return { ...state, automations: action.payload };

    case 'ADD_AUTOMATION':
      return { ...state, automations: [...state.automations, action.payload] };

    case 'UPDATE_AUTOMATION':
      return {
        ...state,
        automations: state.automations.map((automation, index) =>
          index === action.payload.index ? action.payload.automation : automation,
        ),
      };

    case 'DELETE_AUTOMATION':
      return {
        ...state,
        automations: state.automations.filter((_, index) => index !== action.payload),
      };

    case 'SET_CURRENT_AUTOMATION':
      return { ...state, currentAutomation: action.payload };

    case 'CLEAR_CURRENT_AUTOMATION':
      return { ...state, currentAutomation: null };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'SET_ONLINE':
      return { ...state, isOnline: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    case 'RESET_STATE':
      return { ...initialState, isLoading: false };

    default:
      return state;
  }
}
