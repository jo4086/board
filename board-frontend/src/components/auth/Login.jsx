import React, { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as S from '../../styles/styledComponent'

const Login = () => {
    return (
        // <S.Container>
            <Link to="/signup">
                <S.Button>회원가입</S.Button>
            </Link>
        // </S.Container>
    )
}

export default Login
