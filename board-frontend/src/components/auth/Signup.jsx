import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../../features/authSlice'

import * as S from '../../styles/styledComponent'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [nick, setNick] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isSignupCompletem, setIsSignupComplete] = useState(false)
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.auth)

    const handleSignup = useCallback(() => {
        if (!email.trim() || !nick.trim() || !password.trim() || !confirmPassword.trim()) {
            alert('모든 값을 입력하세요.')
            return
        }

        if (password !== confirmPassword) {
            alert('비밀번호 확인이 일치하지 않습니다.')
            return
        }

        dispatch(registerUserThunk({ email, nick, password }))
            .unwrap()
            .then(() => {
                setIsSignupComplete(true) // 회원가입 상태 true(완료)변경
            })
            .catch((error) => {
                console.error(`회원가입 중 에러가 발생 : ${error}`)
            })
    }, [dispatch, email, nick, password, confirmPassword])

    if (isSignupCompletem) {
        return (
            <>
                <S.Section style={{display:'flex',flexDirection:'column',textAlign:'center',gap:'50px'}}>
                    <h2>회원가입이 완료되었습니다.</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h3>로그인 페이지로 이동 또는 다른 작업을 계속 진행하세요</h3>
                    </div>
                    <S.Button style={{ width: '40%', margin: '10px auto' }} onClick={() => (window.location.href = '/login')}>
                        {' '}
                        로그인 페이지로 이동
                    </S.Button>
                </S.Section>
            </>
        )
    }

    return (
        <S.Section style={{ display: 'block',textAlign:'center' }}>
            <h4>회원가입 필드를 입력하세요</h4>
            {error && <div style={{border:'1px solid black',padding:'20px',margin:'10px auto'}}>{error}</div>}

            <S.Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
            <S.Input
                placeholder="이름"
                type="text"
                value={nick}
                onChange={(e) => {
                    setNick(e.target.value)
                }}
            />
            <S.Input
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <S.Input
                placeholder="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value)
                }}
            />

            <S.Button style={{display:'block', width:'60%',margin:'20px auto'}} onClick={handleSignup} disabled={loading}>
                {loading ? '가입중' : '회원가입'}
            </S.Button>
        </S.Section>
    )
}

export default Signup