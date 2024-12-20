import { Pagination, Stack } from '@mui/material'
import React, { useCallback, useState, useEffect } from 'react'
import * as S from '../styles/styledComponent'
import { fetchPostsThunk } from '../features/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import PostItem from '../components/post/PostItem'
import { Box } from '../styles/myUi'

const Home = ({ isAuthenticated, user }) => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const { posts, pagination, loading, error } = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPostsThunk(page))
    }, [dispatch, page])

    const handlePageChange = useCallback((event, value) => {
        setPage(value)
    }, [])

    return (
        <S.Container>
            <h1>Home</h1>
            {loading && (
                <S.Section variant="body1" align="center">
                    로딩 중...
                </S.Section>
            )}
            {error && (
                <S.Section variant="body1" align="center" color="error">
                    에러 발생:{error}
                </S.Section>
            )}

            {posts.length > 0 ? (
                <>
                    {' '}
                    <Box model="grid" columns="repeat(3, 1fr)" gap="3px" padding="20px" backgroundColor="yellow">
                        {posts.map((post) => (
                            <PostItem key={post.id} post={post} isAuthenticated={isAuthenticated} user={user} />
                        ))}
                    </Box>
                    <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                        <Pagination
                            count={pagination.totalPages} 
                            post={page}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </>
            ) : (
                !loading && <S.Section>게시물이 없습니다.</S.Section>
            )}
            {/* {posts.length > 0 && (
                <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                    <Pagination
                        count={pagination.totalPages} // 전체 페이지수
                        post={page}
                        onChange={handlePageChange} // 페이지를 변경하는 함수
                    />
                </Stack>
            )} */}
        </S.Container>
    )
}

export default Home

/*

 <Box model="grid" columns="repeat(3, 1fr)" gap="3px" padding="20px" backgroundColor="yellow">
                {posts.length > 0 ? (
                    <>
                        {posts.map((post) => (
                            <PostItem key={post.id} post={post} isAuthenticated={isAuthenticated} user={user} />
                        ))}
                    </>
                ) : (
                    !loading && <S.Section>게시물이 없습니다.</S.Section>
                )}
            </Box>

*/