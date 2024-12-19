import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, updatePost, deletePost, getPosts, getPostById } from '../api/boardApi'

export const createPostThunk = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
    try {
        const response = await createPost(postData)
        return response.data.post
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '게시물 등록 실패!')
    }
})

export const updatePostThunk = createAsyncThunk('posts/updatePost', async (data, { rejectWithValue }) => {
    try {
        const { id, postData } = data
        const response = await updatePost(id, postData)
        return response.data.post
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '게시물 수정 실패!!')
    }
})

export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
    try {
        await deletePost(id)
        return id
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패!!')
    }
})

export const fetchPostsThunk = createAsyncThunk('posts/fetchPosts', async (page, { rejectWithValue }) => {
    try {
        const response = await getPosts(page)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || '전체 게시물 불러오기 실패!!')
    }
})

export const fetchPostByIdThunk = createAsyncThunk('posts/fetchPostById', async (id, { rejectWithValue }) => {
    try {
        const response = await getPostById(id)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || `ID: ${id} 게시물 불러오기 실패!!`)
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        loading: false,
        error: null,
        posts: [],
        post: null,
        pagination: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // 1. createPostThunk
        builder
            .addCase(createPostThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createPostThunk.fulfilled, (state, action) => {
                state.loading = false
                state.posts = [...state.posts, action.payload]
            })
            .addCase(createPostThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        // 2. updatePostThunk
        builder
            .addCase(updatePostThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePostThunk.fulfilled, (state, action) => {
                state.loading = false
                const index = state.posts.findIndex((post) => post.id === action.payload.id)
                if (index !== -1) {
                    state.posts[index] = action.payload
                }
            })
            .addCase(updatePostThunk.rejected, (state, aciton) => {
                state.loading = false
                state.error = aciton.payload
            })

        // 3. deletePostThunk
        builder
            .addCase(deletePostThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(deletePostThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        // 4. fetchPostsThunk
        builder
            .addCase(fetchPostsThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPostsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload.posts
                state.pagination = action.payload.pagination
            })
            .addCase(fetchPostsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

        // 5. fetchPostByIdThunk
        builder
            .addCase(fetchPostByIdThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
                state.loading = false
                state.post = action.payload.post
            })
            .addCase(fetchPostByIdThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default postSlice.reducer
