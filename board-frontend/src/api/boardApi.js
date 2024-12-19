// board\board-frontend\src\api\boardApi.js
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

const boardApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 세션 쿠키를 요청에 포함??
})

export const registerUser = async (userData) => {
    try {
        const response = await boardApi.post('/auth/join', userData)
        return response
    } catch (err) {
        console.error(`API request 에러: ${err.message}`)
        throw err // 리퀘스트에 오류 발생시 에러를 registerUser() 함수를 실행한 곳에 던짐
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await boardApi.post('/auth/login', credentials)
        return response
    } catch (err) {
        console.error(`API Request 오류: ${err.message}`)
        throw err
    }
}

export const logoutUser = async () => {
    try {
        const response = await boardApi.get('/auth/logout')
        return response
    } catch (err) {
        console.error(`API Request 오류: ${err.message}`)
        throw err
    }
}

// 로그인 여부 체크
export const checkAuthStatus = async () => {
    try {
        const response = await boardApi.get('/auth/status')
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}

// 2. 게시물 작성
// 2-1. 글쓰기
export const createPost = async (postData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data' // 파일 전송시 반드시 지정
            },
        }

        const response = await boardApi.post('/post', postData, config)
        return response        
    } catch (error) {
        console.error(`API Request 오류: ${error.message}`)
        throw error
    }
}

// 2-2. 게시물 수정
export const updatePost = async (id, postData) => {
    try {
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            }
        }

        const response = await boardApi.put(`/post/${id}`, postData, config)
        return response
    } catch (error) {
        console.error(`API Request 오류: ${error.message}`)
        throw error
    }
}

// 2-3. 게시판 삭제
export const deletePost = async (id) => {
    try {
        const response = await boardApi.delete(`/post/${id}`)
        return response
    } catch (error) {
        console.error(`API Request 오류: ${error.meesage}`)
        throw error
    }
}

// 2-4. 전체 게시판 조회
export const getPosts = async (page) => {
    try {
        const response = await boardApi.get(`/post?page=${page}`)
        return response
    } catch (error) {
        console.error(`API Request 오류: ${error.message}`)
        throw error
    }
}

// 2-5. 특정 게시판 조회
export const getPostById = async (id) => {
    try {
        const response = await boardApi.get(`/post/${id}`)
        return response
    } catch (error) {
        console.error(`API Request 오류: ${error.message}`)
        throw error
    }
}
