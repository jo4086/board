import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
// import { Nav } from '../../styles/styledComponent'
import * as S from '../../styles/styledComponent'

const Navbar = ({ isAuthenticated }) => {
    return (
        <S.Nav>
            <S.NavUl>
                <Link to="/">
                    <S.Button>메인페이지</S.Button>
                </Link>
            </S.NavUl>
            <Link to="/login">
                <S.Button>로그인</S.Button>
            </Link>
        </S.Nav>
    )
}

export default Navbar
