import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser, UserRole } from '../../types/auth';

interface AuthState {
  mobileNumber: string;
  role: UserRole | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
}

const initialState: AuthState = {
  mobileNumber: '',
  role: null,
  accessToken: null,
  refreshToken: null,
  user: null,
};

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
    },
    clearAuth: () => initialState,
  },
});

export const { setAuthSession, clearAuth } = authSlice.actions;
export default authSlice.reducer;
