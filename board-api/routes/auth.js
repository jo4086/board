const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const User = require('../models/user')
const router = express.Router()
require('dotenv').config()

// 1. 회원가입, localhost:8000/auth/join
router
    .post('/join', async (req, res, next) => {
        const { email, nick, password } = req.body
        try {
            const exUser = await User.findOne({ where: { email } })

            if (exUser) {
                return res.status(409).json({
                    success: false,
                    message: '이미 존재하는 email입니다.'
                })
            }
            
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;
            
            const hash = await bcrypt.hash(password, saltRounds)

            const newUser = await User.create({
                email,
                nick,
                password: hash,
            })

            res.status(201).json({
                success: true,
                message: '사용자가 성공적으로 등록',
                user: {
                    id: newUser.id,
                    nick: newUser.nick,
                    email: newUser.email,
                }
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                success: false,
                message: '회원가입 중 오류 발생',
                err
            })
        }
    })

// 로그인
router
    .post('/login', isNotLoggedIn, async (req, res, next) => {
        passport.authenticate('local', (authError, user, info) => {
            if (authError) {
                return res.status(500).json({ success: false, message: '인증 중 오류 발생', error: authError })
            }

            if (!user) {
                // 비밀번호 불일치 및 사용자 존재X시 info.message로 메세지 전달
                return res.status(401).json({
                    success: false,
                    message: info.message || '로그인 실패'
                })
            }

            // 인증 OK => 로그인 상태로 변경
            req.login(user, (loginError) => {
                if (loginError) {
                    // 로그인 도중 오류 발생
                    return res.status(500).json({
                        success: false,
                        message: '로그인 중 오류 발생',
                        error: loginError
                    })
                }

                // 로그인 성공, user 객체와 response 함, status code 미설정 시 기본값 200(OK)
                res.json({
                    success: true,
                    message: '로그인 성공',
                    user: {
                        id: user.id,
                        nick: user.nick,
                    }
                })
            })
        })(req, res, next)
    })

// 로그아웃,, localhost:8000/auth/logout

router
    .get('/logout', async (req, res, next) => {
        // 로그아웃 상태로 변경
        req.logout((error) => {
            if (error) {
                // 로그아웃 중 에러 발생
                console.log(error)

                return res.status(500).json({
                    success: false,
                    message: '로그아웃 중 오류 발생',
                    error,
                })
            }

            // 로그아웃 성공시 세션에 저장된 사용자 id 삭제,, 아래같은 결과를 response
            res.json({
                success: true,
                message: '로그아웃에 성공'
            })
        })
    })

// 로그인 상태 확인

router
    .get('/status', async (req, res, next) => {
        if (req.isAuthenticated()) {
            // 로그인 상태시, req.user는 passport의 역직렬화 설정에 의해 로그인 상태시 로그인의 user 정보를 가져올 수 있음
            res.json({
                isAuthenticated: true,
                user: {
                    id: req.user.id,
                    nick: req.user.nick,
                }
            })
        } else {
            // 로그인 상태가 아닐때,
            res.json({
                isAuthenticated: false,
            })
        }
    })

module.exports = router
