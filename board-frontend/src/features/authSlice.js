import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../api/boardApi'


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




const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
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
    }
})

export default authSlice.reducer