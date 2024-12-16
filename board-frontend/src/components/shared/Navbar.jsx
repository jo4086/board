import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { Nav } from '../../styles/styledComponent'
import * as S from '../../styles/styledComponent'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../../features/authSlice'

const Navbar = ({ isAuthenticated, user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = useCallback(() => {
        dispatch(logoutUserThunk())
            .unwrap()
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                alert(error)
            })
    }, [dispatch, navigate])

    return (
        <S.Nav>
            <S.NavUl>
                <Link to="/">
                    <S.Button>메인페이지</S.Button>
                </Link>
            </S.NavUl>

            {isAuthenticated ? (
                <S.navLogin>
                    <Link to="/post/create">
                        <S.Button>글쓰기</S.Button>
                    </Link>
                    <Link to="/my">
                        <div style={{ backgroundColor: 'white', padding: '15px 20px', boxSizing: 'border-box', textDecorationLine: 'none', fontSize: '1.2em', borderRadius: '5px', fontWeight: 'bold' }}>{user?.nick} 님</div>
                    </Link>
                    <S.Button onClick={handleLogout}>로그아웃</S.Button>
                </S.navLogin>
            ) : (
                <Link to="/login">
                    <S.Button>로그인</S.Button>
                </Link>
            )}
        </S.Nav>
    )
}

export default Navbar
