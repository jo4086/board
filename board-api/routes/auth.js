const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', async (req, res, next) => {
   res.status(200).json({
      message: '회원가입 정보를 입력하세요'
   })
})

router
   .post('/join', async (req, res, next) => {
      const {email, nick, password} = req.body
      try {
         const exUser = await User.findOne({where:{email}})
         if (exUser) {
            return res.status(409).json({
               success: false,
               message: '이미 존재하는 Email입니다.',
            })
         }

         const hash = await bcrypt.hash(password, 12)

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

module.exports = router