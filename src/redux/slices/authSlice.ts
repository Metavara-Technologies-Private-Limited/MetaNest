import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser, UserRole } from '../../types/auth';

interface AuthState {
  mobileNumber: string;
  role: UserRole | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
}

const AUTH_SESSION_STORAGE_KEY = 'metanest_auth_session';

function readPersistedAuth(): AuthState {
  const emptyState: AuthState = {
    mobileNumber: '',
    role: null,
    accessToken: null,
    refreshToken: null,
    user: null,
  };

  try {
    const storedSession = localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!storedSession) return emptyState;

    const session = JSON.parse(storedSession) as Partial<AuthState>;
    if (!session.accessToken || !session.refreshToken || !session.role || !session.user) {
      return emptyState;
    }

    return {
      mobileNumber: session.mobileNumber ?? '',
      role: session.role,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: session.user,
    };
  } catch {
    return emptyState;
  }
}

const initialState: AuthState = readPersistedAuth();

function persistAuth(state: AuthState) {
  localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(state));
}

function clearPersistedAuth() {
  localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSession: (
      state,
      action: PayloadAction<{
        mobileNumber: string;
        role: UserRole;
        accessToken: string;
        refreshToken: string;
        user: AuthUser;
      }>,
    ) => {
      state.mobileNumber = action.payload.mobileNumber;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      persistAuth(state);
    },
    clearAuth: () => {
      clearPersistedAuth();
      return {
        mobileNumber: '',
        role: null,
        accessToken: null,
        refreshToken: null,
        user: null,
      };
    },
  },
});

export const { setAuthSession, clearAuth } = authSlice.actions;
export default authSlice.reducer;
