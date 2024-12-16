import { Routes, Route } from 'react-router-dom'
import './styles/common.css'

import Navbar from './components/shared/Navbar'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
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
            </Routes>
        </>
    )
}

export default App
