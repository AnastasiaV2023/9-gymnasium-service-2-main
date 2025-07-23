import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '@/api/api.auth';
import { cookieUtils } from '@/utils/cookies';

interface AuthState {
  isAuth: boolean;
  isAuthInProgress: boolean;
  userId: string | null;
}

const initialState: AuthState = {
  isAuth: AuthService.isAuthenticated(),
  isAuthInProgress: false,
  userId: AuthService.getUserId(),
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const resp = await AuthService.login(email, password);
    // Сервер устанавливает httpOnly cookies автоматически
    // Сохраняем только ID пользователя в обычном cookie для доступа из JS
    cookieUtils.setCookie('user-id', resp.data.user.id.toString(), 7);
    return {
      userId: resp.data.user.id.toString(),
      message: resp.data.message
    };
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const resp = await AuthService.refresh();
    // Обновляем ID пользователя в cookie
    cookieUtils.setCookie('user-id', resp.data.user.id.toString(), 7);
    return {
      userId: resp.data.user.id.toString(),
      message: resp.data.message
    };
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await AuthService.logout();
    // Удаляем пользовательские cookies (httpOnly cookies удалит сервер)
    cookieUtils.deleteCookie('user-id');
    return { message: 'Logged out successfully' };
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
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isAuthInProgress = false;
        state.userId = action.payload.userId;
      })
      .addCase(login.rejected, (state) => {
        state.isAuthInProgress = false;
        state.isAuth = false;
        state.userId = null;
        console.log("login error");
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isAuthInProgress = false;
        state.userId = action.payload.userId;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthInProgress = false;
        state.isAuth = false;
        state.userId = null;
        console.log("check auth error");
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.isAuthInProgress = false;
        state.userId = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isAuthInProgress = false;
        console.log("logout error");
      });
  },
});

export default authSlice.reducer; 