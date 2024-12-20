import * as S from '../../styles/styledComponent'
import React, { useState, useCallback, useMemo } from 'react'
import { Button, InputField } from '../shared'

const PostForm = () => {
    return (
        <S.Section style={{ justifyContent: 'left' }}>
            {/* <h1>PostForm 확인</h1> */}
            <form style={{width:'100%'}}>
                <Button as="label">
                    이미지 업로드
                    <input type="file" name="img" accept="image/*" hidden />
                </Button>
                <InputField multiline rows={4} fullWidth label="게시물 내용을 입력하세요" />
                {/* <div style={{backgroundColor:"black", width:'100%',height:'40px'}}></div> */}
            </form>
        </S.Section>
    )
}

export default PostForm
