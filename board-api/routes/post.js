// board-api/routes/post.js
const errorPath = 'board-api/routes/post.js'
// 현재 작업중인 디렉토리 경로
console.log('▼ process.cwd()\n', '┗━▶', process.cwd())

const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Post, Hashtag, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

// uploads 폴더 생성
try {
    fs.readdirSync('uploads')
} catch (error) {
    console.log('uploads 폴더가 없습니다. 새로 생성하겠습니다.')
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/') // 업로드 폴더 경로 설정
        },
        filename(req, file, cb) {
            const decodedFileName = decodeURIComponent(file.originalname) // 파일명 디코딩( 한글명 깨짐 방지 )

            const ext = path.extname(decodedFileName) // 확장자 추출

            const basename = path.basename(decodedFileName, ext) // 확장자 제거 파일명 추출
            cb(null, basename + Date.now() + ext)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

const postData = async (req, res, next) => {
    try {
        const exPost = await Post.findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id,
            },
        })
        if (!exPost) {
            return res.status(404).json({
                success: false,
                message: '게시물을 찾을 수 없습니다.'
            })
        }
        req.post = exPost
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: '게시물 처리 중 오류가 발생하였습니다.',
            errorPath,
            error
        })
    }
}

// ['/']: 경로
router
    .route('/') // 요청경로: POST.['/posts']
    .post(isLoggedIn, upload.single('img'), async (req, res) => {
        try {
            console.log('파일정보: ', req.file)

            // 1. 이미지파일 여부 확인 없으면 null
            const imgPath = req.file ? req.file.filename : null
            
            // 2. model=Post에 게시물 생성
            const post = await Post.create({
                content: req.body.content,
                img: imgPath,
                UserId: req.user.id, // passport를 이용
            })

            // 3. 해시태그 추출,, 정규표현식 사용
            const hashtags = req.body.hashtags.match(/#[^\s#]*/g) // #부터 [공백 또는 다음샵구분] 문자열 전체에서 모두 서칭 후 배열로 반환

            if (hashtags) {
                const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate(
                    {
                        where: { title: tag.slice(1) }                        
                    })))

                await post.addHashtags(result.map((r) => r[0])) // 4. 해시태그 연결
            } // 해시태그가 없거나 콘텐츠가 없는 부분은 프론트에서 체크함

            res.json({
                success: true,
                post: {
                    id: post.id,
                    content: post.content,
                    img: post.img,
                    UserId: post.UserId,
                },
                message: '게시물이 성공적으로 등록되었습니다.'
            })
        } catch (error) {로
            console.error(error)
            res.status(500).json({
                success: false,
                message: '게시물 등록 중 오류 발생!! (board-api)',
                errorPath,
                error,
            })
        }
    }) // 요청경로: GET.['/posts']
    .get(async (req, res) => {
        try { //1. 
            /** parseInt([parameter_1], [parameter_2])
             * [parameter_1]: 진수 변환할 변수 (예시 '08')
             * [parameter_2]: 2, 8, 10, 16 진수 등으로 변환 (10진수일 경우 8)
             **/
            const page = parseInt(req.query.page, 10) || 1 // page번호
            const limit = parseInt(req.query.limit, 10) || 6 // 페이지당 게시물 기본값 3개 제한
            const offset = (page - 1) * limit // 페이지당 3개의 게시물을 누적시킨 수를 제외하고 다음 게시물 출력
            // 2. 게시물 전체 레코드 GET
            const count = await Post.count()

            const posts = await Post.findAll({ // [model: Post]에서 해당 쿼리문을 조건으로 찾겠다.
                limit, // 데이터수는 총 3개를 가져올 것이다
                offset, // 여기에 기록된 수의 다음에 오는 데이터부터 가져올 것이다.
                order: [['createdAt', 'DESC']], //Post모델 기준 최신 날짜 순으로 정렬해서 가져올 것이다.
                include: [
                    {
                        model: User, // associate에서 db.Post.belongsTo(db.User)가 있기에 인클루드함
                        attributes: ['id', 'nick', 'email'],
                    },
                    {
                        model: Hashtag, // 엔티티관계도에서는 posts는 posthashtag를 거쳐 hashtags와 연결되지만
                        attributes: ['title'], // 실제로는 associate로 db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'})를 선언했기에 코드내부적으로 Post와 Hashtag는 직접 연결상태이므로 include로 조인할 수 있음
                    }, // 즉 include의 사용 조건은 associate에서 모델간의 관계성을 직접 선언해야만 사용할 수 있다.
                ]
            })

            res.json({
                success: true,
                posts,
                pagination: {
                    totalPosts: count, // 전체 게시물 count = await Post.count()
                    currentPage: page, // 현재 페이지 수
                    totalPages: Math.ceil(count / limit), // 총페이지수 (게시물수 / 화면에 보여줄 게시물수)의 올림처리 
                    limit, // 페이지당 게시물 수
                },
                message: '전체 게시물을 성공적으로 불러왔습니다.'
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: '전체 게시물 로드중 오류가 발생하였습니다.',
                errorPath,
                error,
            })
        }
    })


// [/posts/:id] 경로

router
    .get('/:id', async (req, res) => {
        try {
            const post = await Post.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'nick', 'email']
                    },
                    {
                        model: Hashtag,
                        attributes: ['title']
                    }
                ]
            })

            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: '게시물을 찾을 수 없습니다.'
                })
            }

            res.json({
                success: true,
                post,
                message: '게시물을 성공적으로 불러왔습니다.',
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: '게시물 처리 중 오류가 발생하였습니다.',
                errorPath,
                error
            })
        }
    })

// [/post/:id] 경로의 isLoggedIn, postData 적용
router // 1. 게시물 수정, 2. 게시물 삭
    .route('/:id')
    .all(isLoggedIn, postData)
    .put(upload.single('img'), async (req, res) => {
        try {
            const post = req.post

            // 1. 게시물 수정
            await post.update({
                content: req.body.content,
                img: req.file ? `/${req.file.filename}` : post.img,
            })

            // 2. 게시물에서 해시태그 추출
            const hashtags = req.body.hashtags.match(/#[^\s#]*/g)
            let result = []
            if (hashtags) {
                result = await Promise.all(
                    hashtags.map((tag) => Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase() }
                    }))
                )
            }

            // 3. posthashtag 관계 테이블 업데이트 (기존 연결 해제후 새로운 연결 추가),,
            // addHashtags는 생성, 업데이트는 [setHashtags],, 아마 새로운 hashtagid가 할당될것
            await post.setHashtags(result.map((r) => r[0]))

            const updatedPost = await Post.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'nick', 'email']
                    },
                    {
                        model: Hashtag,
                        attributes: ['title']
                    }
                ]
            })

            res.json({
                success: true,
                post: updatedpost,
                message: '게시물이 성공적으로 수정되었습니다.',
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: '게시물 수정 중 오류가 발생하였습니다.',
                errorPath,
                error,
            })
        }
    })
    .delete(async (req, res) => {
        try {
            const post = req.post
            
            await post.destroy()

            res.json({
                success: true,
                message: '게시물이 성공적으로 삭제되었습니다.'
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                success: false,
                message: '게시물 삭제 중 오류가 발생하였습니다.',
                errorPath,
                error
            })
        }
    })
module.exports = router
