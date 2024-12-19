// board-api/app.js
// ━━━━━━━━━━━ 1. 미들웨어 가져오기 및 변수저장
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')

const app = express()
require('dotenv').config()

// ━━━━━━━━━━━ 2. 라우터 및 기타 모듈 불러오기
const { sequelize } = require('./models')
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const passportConfig = require('./passport')

passportConfig() // passport 실행
// ━━━━━━━━━━━ 3. 기본 포트 설정하기
app.set('port', process.env.PORT || 8005)

// ━━━━━━━━━━━ 4. 시퀄라이즈를 사용한 DB 연결
sequelize // .sync({ force: false }): DB와 모델의 동기화 설정
    .sync({ force: false }) // true: 기존 테이블을 모두 삭제 후 새로 생성, 주로 개발 초기단계나 스키마를 완전히 변경해야 할 때 사용.
    .then(() => {
        // false: 기존 테이블삭제X, 필요한 경우 변경사항만 반영,, 기존에 테이블이 있다면, 유지시키며 데이터 보존
        console.log('데이터베이스 연결 성공!') // 연결 성공텍스트 출력
    })
    .catch((err) => {
        console.error(err) // 연결 실패시 오류 출력
    })

app.use(
    cors({
        origin: 'http://localhost:3005', // 특정 주소만 request 허용
        credentials: true, // 쿠키, 세션 등 인증정보 허용
    }),
)

// ━━━━━━━━━━━ 5. 미들웨어 설정,, (app.use: Express에서 미들웨어 등록 때 사용)
app.use(morgan('dev')) // HTTP 요청 로깅

// express.static(): Express의 메서드 중 하나로 정적파일(HTML, CSS, JS, 이미지)등을 클라리언트에 제공하는 역할
// path(): Node.js모듈,, 디렉토리 경로 생성
// path.join(__dirname, 'uploads'): __dirname은 현재 작성중인 파일의 경로를 유동적으로 내며 join은 매개변수끼리를 '\'로 묶는 역할,
/// __dirname은 C:\project\board\board-api로 현재 경로 이후에 'uploads'를 붙여서 최종경로 [ C:\project\board\board-api\uploads ]로 생성해준다.
app.use(express.static(path.join(__dirname, 'uploads'))) // 정적 파일 제공
app.use(express.json()) // Json형식으로 데이터 파싱
app.use(express.urlencoded({ extended: false })) // URL-encoded 데이터 파싱
/** urlencoded(): 클라이언트가 보낸 HTTP 요청의 본문(body)에서 URL-encoded 형태의 데이터를 파싱,, 주로 HTML 폼에서 보내는 요청에서 사용
 ** extended: URL-encoded 데이터 구조의 정의
 
 ** ex Data: key1=value&key2[subkey]=value2
 ** {extended: false}: 데이터를 querystring 모듈로 파싱
 * 단순 객체만 처리가능 (중첩 객체 지원불가)
 * 제한적 사용으로 메모리 사용량이 적음
 * ex Result: { key1: 'value1', 'key2[subkey]': 'value2' }
 *
 ** {extended: true}: 데이터를 qs(query-string)모듈로 파싱
 * 중첩된 객체나 복잡한 데이터 구조 처리 가능
 * 메모리 사용량 많음 But,, 유연한 데이터 처리가능
 * ex Result: { key1: 'value1', key: { subkey: 'value2' } }
 **/
app.use(cookieParser(process.env.COOKIE_SECRET)) // 쿠키 설정

// Session 설정
app.use(
    session({
        resave: false, // 세션 데이터 변경이 없으면 재저장 안함
        saveUninitialized: true, // 초기화 되지 않은 빈 세션도 저장함
        secret: process.env.COOKIE_SECRET, // 세션 암호화 키
        cookie: {
            httpOnly: true, // javascript로 쿠키 접근 여부,,  true: 접근 불가
            secure: false, // https를 사용할 때만 쿠키 전송할지? false== http도 사용 가능함
        },
    }),
)

// Passport 초기화, 세션 연동
app.use(passport.initialize()) // 초기화
app.use(passport.session()) // Passport와 생성해둔 세션 연결

// ━━━━━━━━━━━ 6. (Router middleware)
// 6.1 라우터 등록
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/post', postRouter)

// 6.2 잘못된 라우터 경로 처리
app.use((req, res, next) => {
    const err = new Error(`${method}${req.url} 라우터가 없습니다.`) // 에러 객채 새로 생성
    err.status = 404 // err의 상태코드 404로 설정
    next(err) // 에러 미들웨어로 전송
})

// ━━━━━━━━━━━ 7. 에러처리 미들웨어
app.use((err, req, res, next) => {
    const statusCode = err.status || 500 // 에러코드가 있으면 사용 없으면 500
    const errorMessage = err.message || '서버 내부 오류' // 에러 메세지 있으면 사용, 없으면 후자 출력

    console.log(err)

    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: err,
    })
})

// ━━━━━━━━━━━ 8. 경로 요청 성공 및 응답
app.options('*', cors()) // 모든 경로에 대한 options 요청 허용,
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중')
})
