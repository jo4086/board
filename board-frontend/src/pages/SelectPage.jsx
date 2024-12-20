import * as S from '../styles/styledComponent'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Box } from '../styles/myUi'
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { CardActions, IconButton } from '@mui/material'
import { Button } from '../components/shared'
import { deletePostThunk } from '../features/postSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const SelectPage = ({ isAuthenticated, user }) => {
    const [post, setPost] = useState(null)
    const dispatch = useDispatch()
    const { posts, loading, error } = useSelector((state) => state.posts)
    const { id } = useParams()

    useEffect(() => {
        try {
            if (posts.length > 0) {
                const get = posts.filter((post) => post.id == id)[0]
                setPost(get)
            }
        } catch (error) {
            console.error(error)
        }
    })
    /*  useEffect(() => {
        try {
            if (posts.length > 0) {
                const get = posts.filter((post) => post.id === id)[0] // 조건에 맞는 게시물 찾기
                // console.log('filter:',get)
                setPost(get) // 상태 업데이트
            }
        } catch (error) {
            console.error('에러:', error)
        }
    }, [posts, id]) // posts 또는 user가 변경될 때만 실행 */

    const onClickDelete = useCallback(
        (id) => {
            dispatch(deletePostThunk(id))
                .unwrap()
                .then(() => {
                    // navigate('/') => spa방식
                    window.location.href = '/' // 페이지이동, 전체페이지 새로고침
                })
                .catch((error) => {
                    console.error('게시물 삭제 중 오류 발생: ', error)
                    alert('게시물 삭제에 실패하였습니다.', error)
                })
        },
        [dispatch],
    ) 

    return (
        <S.Container>
            <h2>게시물 자세히보기페이지</h2>
            {loading && (
                <Box variant="body1" align="center">
                    로딩 중...
                </Box>
            )}
            {error && (
                <Box variant="body1" align="center" color="error">
                    에러 발생:{error}
                </Box>
            )}
            {post && (
                <Box model="flex" direction="column" justify="center" align="start" padding="10px" backgroundColor="#eee" aspectRatio="0.8" maxWidth="40%" borderRadius="10px">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${post.img}`}
                        alt={post.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover', // 이미지를 박스에 맞게 조정
                            borderRadius: '10px',
                        }}
                    />
                    <Link to={`/my/${post.User.id}`} style={{ textDecoration: 'none', fontSize: '1.5em' }}>
                        <span>@{post.User.nick}</span>
                    </Link>
                    <p>{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                    <p>{post.content}</p>
                    {post.Hashtags.length > 0 && (
                        <>
                            {/* <br /> */}
                            <p>
                                {post.Hashtags.map((hashtag, index) => (
                                    <span key={index}>#{hashtag.title} </span>
                                ))}
                            </p>
                        </>
                    )}
                    <hr style={{ width: '94%', margin: '0 auto', border: 'none', borderTop: '1px solid rgba(0,0,0,0.15)' }} />
                    <CardActions>
                        <Button>
                            <FavoriteBorderIcon fontSize="small" />
                        </Button>
                        {isAuthenticated && post.User.id === user.id && (
                            <Box sx={{ p: 2 }}>
                                <Link to={`/posts/edit/${post.id}`}>
                                    <IconButton aria-label="edit" size="small">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                                <IconButton aria-label="delete" size="small" onClick={() => onClickDelete(post.id)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                    </CardActions>
                </Box>
            )}
        </S.Container>
    )
}

export default SelectPage
