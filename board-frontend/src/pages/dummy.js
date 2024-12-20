{
    loading && (
        <Box variant="body1" align="center">
            로딩 중...
        </Box>
    )
}
{
    error && (
        <Box variant="body1" align="center" color="error">
            에러 발생:{error}
        </Box>
    )
}
{
    post && (
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
    )
}
