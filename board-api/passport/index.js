// board-api/passport/index.js

const passport = require('passport')
const local = require('./localStrategy')
const User = require('../models/user')

module.exports = () => {
    // 1. 직렬화(serializeUser)
    passport.serializeUser((user, done) => {
        done(null, user.id) // 사용자 ID만 세션에 저장, user: 로그인 성공시 사용자 객체
        // done([1para], [2para]): [1para] = Error여부(없으면 null) // [2para] = 세션에 저장할 사용자 식별자 (일반적으로 User.id)
    })

    // 2. 역 직렬화(deserializeUser)
    // 세션에 저장된 User ID를 바탕으로 User 정보 조회
    passport.deserializeUser((id, done) => {
        User.findOne({ where: {id} })
            .then((user) => done(null, user)) // 사용자 정보 복구 후 done()으로 사용자 정보 반환
            .catch((error) => done(error)) // 에러 발생 시 done()으로 에러 반환
    })
    // 로컬 전력(Local Strategy) 초기화
    local() // LocalStrategy.js 파일의 함수를 실행하여 Passport에 loacal전략 추가
}
