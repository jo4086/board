import { Routes, Route } from 'react-router-dom'
import './styles/common.css'

import Navbar from './components/shared/Navbar'
import { Home, SignupPage, PostCreatePage, LoginPage, PostEditPage, MyPage } from './pages'

import { useDispatch, useSelector } from 'react-redux'
import { checkAuthStatusThunk } from './features/authSlice'
import React, { useEffect } from 'react'

function App() {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(checkAuthStatusThunk())
    }, [dispatch])

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            <Routes>
                <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/posts/create" element={<PostCreatePage />} />
                <Route path="/posts/edit/:id" element={<PostEditPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/my/:id" element={<MyPage />} />
            </Routes>
        </>
    )
}

export default App
