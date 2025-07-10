import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '@/api/api.auth';

interface LoginResponse {
  data: {
    accessToken: string;
  };
}

interface RefreshResponse {
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

interface AuthState {
  isAuth: boolean;
  isAuthInProgress: boolean;
}

const initialState: AuthState = {
  isAuth: localStorage.getItem('access-token')? true : false,
  isAuthInProgress: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const resp: LoginResponse = await AuthService.login(email, password);
    localStorage.setItem("access-token", resp.data.accessToken);
    return resp.data.accessToken;
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const resp: RefreshResponse = await AuthService.refresh();
    localStorage.setItem("access-token", resp.data.accessToken);
    if (resp.data.refreshToken) {
      localStorage.setItem("refresh-token", resp.data.refreshToken);
    }
    return resp.data.accessToken;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem("access-token");
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuth = true;
        state.isAuthInProgress = false;
      })
      .addCase(login.rejected, (state) => {
        state.isAuthInProgress = false;
        console.log("login error");
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuth = true;
        state.isAuthInProgress = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthInProgress = false;
        console.log("check auth error");
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.isAuthInProgress = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isAuthInProgress = false;
        console.log("logout error");
      });
  },
});

export default authSlice.reducer; 