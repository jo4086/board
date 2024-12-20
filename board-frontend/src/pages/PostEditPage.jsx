import * as S from '../styles/styledComponent'
import { deletePostThunk } from '../features/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostByIdThunk, updatePostThunk } from '../features/postSlice'
import { useParams } from 'react-router-dom'
import PostForm from '../components/post/PostForm'
import { useCallback, useEffect } from 'react'

const PostEditPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { post, loading, error } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPostByIdThunk(id))
    }, [dispatch, id])

    const handleSubmit = useCallback((postData) => {
        dispatch(updatePostThunk({id, postData}))
            .unwrap()
            .then(() => {
                window.location.href = '/'
            })
            .catch((err) => {
                console.error('REACT 게시물 수정 실패!', err)
                alert('게시물 수정 실패', err)
            })
    })
    if (loading) return <p>로딩 중...</p>
    if (error) return <p>에러발생 : {error}</p>

    return (
        <S.Container>
            <h1>수정 페이지 입니다.</h1>
            {post && <PostForm onSubmit={handleSubmit} initialValues={post} />}
        </S.Container>
    )
}

export default PostEditPage
