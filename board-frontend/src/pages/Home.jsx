import React, { useCallback } from 'react'
import * as S from '../styles/styledComponent'

const Home = () => {
    return (
        <S.Container>
            <h1>컨테이너 헤드</h1>
            <S.Section>
                <h3>섹션1</h3>
            </S.Section>
            <S.Section>
                <h3>섹션2</h3>
            </S.Section>
            <S.Section>
                <h3>섹션3</h3>
            </S.Section>
        </S.Container>
    )
}

export default Home
