import PostForm from '../components/post/PostForm'
import * as S from '../styles/styledComponent'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { createPostThunk } from '../features/postSlice'

const PostCreatePage = () => {
    const dispatch = useDispatch()

    const handleSubmit = useCallback(
        (postData) => {
            // postData: 사용자가 입력한 게시물 데이터
            dispatch(createPostThunk(postData))
                .unwrap()
                .then(() => {
                    // navigate('/')
                    window.location.href = '/'
                })
                .catch((error) => {
                    console.error('REACT_게시물 등록 실패: ', error)
                    alert('게시물 등록 실패', error)
                })
        },
        [dispatch],
    )

    return (
        <S.Container>
            <h1>게시물을 작성하세요</h1>
            <PostForm onSubmit={handleSubmit} />
        </S.Container>
    )
}

export default PostCreatePage
