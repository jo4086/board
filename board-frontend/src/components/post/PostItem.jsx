import { Box } from '../../styles/myUi'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { Link } from 'react-router-dom'


const PostItem = ({ post, isAuthenticated, user }) => {


    return (
        <>
            <Link to={`/view/${post.id}`} >
                <Box model="flex" direction="column" justify="center" align="center" padding="10px" backgroundColor="#eee" aspectRatio="1" borderRadius="10px">
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
                </Box>
            </Link>
        </>
    )
}

export default PostItem
