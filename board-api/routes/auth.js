// board-api/routes/
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
require('dotenv').config()


router.get('/', async (req, res, next) => {
   res.status(200).json({
      message: '회원가입 정보를 입력하세요'
   })
})

router
   .post('/join', isNotLoggedIn
      , async (req, res, next) => {
      const {email, nick, password} = req.body
      try {
         const exUser = await User.findOne({where:{email}})
         if (exUser) {
            return res.status(409).json({
               success: false,
               message: '이미 존재하는 Email입니다.',
            })
         }

         // 환경변수를 사용하여 코드수정 없이 값을 바꾸게함
         // parseInt는 지정된 문자열을 두번째 변수를 기준으로 정수로 변환, 10을 입력하여서 10진수로 변환시킴, 기본적으로 .env의 값을 쓰고 .env의 값이 존재하지 않게 되어도 12로 실행할 수 있게함
         const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12
         const hash = await bcrypt.hash(password, saltRounds)

         const newUser = await User.create({
            email,
            nick,
            password: hash
         })

         console.log('새로운 사용자 등록: ',newUser)
         res.status(201).json({
            success: true,
            message: '사용자의 정보가 정상적으로 등록되었습니다.',
            user: {
               id: newUser.id,
               nick: newUser.nick,
               email: newUser.email
            }
         })
      } catch (err) {
         console.error(err)
         res.status(500).json({
            success: false,
            message: '회원가입 중 오류가 발생하였습니다.',
            err,
         })
         next(err)
      }
   })

   // 로그아웃 localhost:8000/auth/login
router.post('/login', isNotLoggedIn, async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            return res.status(500).json({
                success: false,
                message: '인증 중 오류 발생',
                error: authError,
            })
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: info.message || '로그인 실패',
            })
        }

        req.login(user, (loginError) => {
            if (loginError) {
                return res.status(500).json({
                    success: false,
                    message: '로그인 중 오류 발생',
                    error: loginError,
                })
            }

            res.json({
                success: true,
                message: '로그인 성공',
                user: {
                    id: user.id,
                    nick: user.nick,
                },
            })
        })
    })(req, res, next)
})

// 로그아웃 localhost:8000/auth/logout
router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logout((err) => {
      if (err) {
         console.log(err)

         return res.status(500).json({
            success: false,
            message: '로그아웃 중 에러 발생',
            error: err,
         })
      }
      res.json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

// 로그인 상태 확인 localhost:8000/auth/status
router.get('/status', async (req, res, next) => {})

module.exports = router
