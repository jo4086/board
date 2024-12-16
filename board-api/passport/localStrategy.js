// board-api/passport/
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')


module.exports = () => {
   passport.use(
      new LocalStrategy(
         {
            usernameField: 'email',
            passwordField: 'password',
         },
         async (email, password, done) => {
            const message = '이메일 또는 비밀번호가 일치하지 않습니다.'
            try {
               const exUser = await User.findOne({ where: { email } })
               if (!exUser) {
                  return done(null, false, {
                     message,
                  })
               }
               const matchPassword = await bcrypt.compare(password, exUser.password)
               if (!matchPassword) {
                  return done(null, false, {
                     message,
                  })
               }

               done(null, exUser)
            } catch (err) {
               console.error(err)
               done(err)
            }
         },
      ),
   )
}

/*
module.exports = () => {
   passport.use(
      new LocalStrategy(
         {
            //input 태그에서 name으로 사용하는 이름을 지정
            usernameField: 'email', // req.body.email = 'test@test.com'
            passwordField: 'password', // req.body.password = '1111'
         },
         //실제 인증 로직
         async (email, password, done) => {
            try {
               // 이메일로 사용자 조회
               // select * from users where email = ?
               const exUser = await User.findOne({ where: { email } })

               if (exUser) {
                  //이메일에 해당하는 사용자가 있는 경우 비밀번호 비교
                  const result = await bcrypt.compare(password, exUser.password)

                  if (result) {
                     //비밀번호가 일치하면 사용자 객체를 passport에 반환
                     done(null, exUser)
                  } else {
                     //비밀번호가 일치하지 않는 경우 message를 passport에 반환
                     done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
                  }
               } else {
                  //이메일에 해당하는 사용자가 없는 경우 message를 passport에 반환
                  done(null, false, { message: '가입되지 않은 회원입니다.' })
               }
            } catch (error) {
               console.error(error)
               done(error) //passport에 에러 객체 전달 -> 이후 passport에서 에러 핸들러(미들웨어)로 전달
            }
         },
      ),
   )
}
*/