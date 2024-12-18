// board-api/routes/post.js

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
        filename(req, file, db) {
            const decodedFilName = decodeURIComponent(file.originalname) // 파일명 디코딩( 한글명 깨짐 방지 )

            const ext = path.extname(decodedFileName) // 확장자 추출

            const basename = path.basename(decodedFileName, ext) // 확장자 제거 파일명 추출
            cb(null, basename + Date.now() + ext)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})
