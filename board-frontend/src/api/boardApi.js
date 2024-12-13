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