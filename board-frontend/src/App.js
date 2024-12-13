import { Routes, Route } from 'react-router-dom'
import './styles/common.css'

import Navbar from './components/shared/Navbar'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'

function App() {
    return (
        <>
            <Navbar isAuthenticated={false} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </>
    )
}

export default App
