import * as S from '../styles/styledComponent'
import Login from '../components/auth/Login'

const LoginPage = () => {
    return (
        <S.Container>
            <h1>로그인 페이지입니다.</h1>
            <Login />
        </S.Container>
    )
}

export default LoginPage
