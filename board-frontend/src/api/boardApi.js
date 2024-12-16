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
        const response =await boardApi.get('/auth/status')
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}