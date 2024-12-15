// board\board-frontend\src\features\authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, loginUser, logoutUser } from '../api/boardApi'


export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await registerUser(userData)
        return response.data.user
    } catch (error) {
        console.error(error)
        // 옵셔널 체이싱, 찾아보기
        return rejectWithValue(error.response?.data?.message || '회원가입 실패')
    }
})

export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await loginUser(credentials)
        return response.data.user
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || '로그인 실패!')
    }
})

export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async(_, { rejectWithValue }) => {
    try {
        const response = await logoutUser()
        return response
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || '로그아웃 실패!')
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                // registerUserThunk에서 rejectWithValue의 메세지를 받아냄
            })
        builder
            .addCase(loginUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        builder
            .addCase(logoutUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logoutUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(logoutUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default authSlice.reducer
