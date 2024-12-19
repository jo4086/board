import * as S from '../../styles/styledComponent'
import React, { useState, useCallback, useMemo } from 'react'
import { Button, InputContainer } from '../shared'

const PostForm = () => {
    return (
        <S.Section style={{ justifyContent: 'left' }}>
            {/* <h1>PostForm 확인</h1> */}
            <form>
                <Button as="label">
                    이미지 업로드
                    <input type="file" name="img" accept="image/*" hidden />
                </Button>
                <InputContainer label="게시물 내용을 입력하세요" />
            </form>
        </S.Section>
    )
}

export default PostForm
