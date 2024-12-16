// board\board-frontend\src\components\auth\Login.jsx

import React, { useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import * as S from '../../styles/styledComponent'
import InputField from '../shared/InputContainer'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (email.trim() && password.trim()) {
            dispatch(loginUserThunk({ email, password }))
               .unwrap()
               .then(() => navigate('/'))
               .catch((error) => console.error('로그인 실패: ', error))
         }
      },
      [dispatch, email, password, navigate],
   )

   const loginButtonContent = useMemo(() => (loading ? '로그인 중' : '로그인'), [loading])

   return (
      // <S.Container>
      <S.Section style={{ display: 'block' }}>
         {!error && <h2>로그인 페이지</h2>}
         {error && <h2>{error}</h2>}
         <form onSubmit={handleLogin}>
            <InputField label="이메일" name="email" value={email} autoComplete="username" onChange={(e) => setEmail(e.target.value)} />
            <InputField label="비밀번호" name="password" type="password"  value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />

            <S.Button type="submit" disabled={loading}>
               {loginButtonContent}
            </S.Button>
         </form>

         <p>
            {' '}
            계정이 없다면?
            <Link to="/signup">회원가입</Link>
         </p>
      </S.Section>
      // </S.Container>
   )
}

export default Login
