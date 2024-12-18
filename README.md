## MiddleWare

-   **`passport-local`**

## board-api/routes/post.js

**Question?**

-   `board-api/routes/post.js`에서 **`fs`** 내장모듈을 사용하여 `uploads`폴더를 생성하였는데 어째서 **`board-api/uploads`** 경로에 `uploads` 폴더가 생성될까?

```diff
## post.js
! 폴더 생성을 실행한 파일경로: board-api/routes/post.js
try {
    fs.readdirSync('uploads')
} catch (error) {
    console.log('uploads 폴더가 존재하지 않습니다. 폴더를 새로 생성하겠습니다.)
    fs.mkdirSync('uploads')
}

! 생성된 폴더경로: board-api/uploads
```

**Q.E.D**
 uploads폴더의 디렉토리 경로를 `app.js`위치 기준으로 설정했기 때문!!


```diff
## app.js

app.use(express.static(path.join(__dirname, 'uploads')))

! '__dirname': 현재 작성중인(app.js) 파일의 경로를 뜻함
=> [board-api]
이 경로를 기준으로 [/uploads] 생성하기 때문이다.
```


multer에서 **`cb`**란?? node에서 cb는 `callback`함수를 의미하며

공통적으로 첫번째 인수는 error처리 변수(없으면 null), 두번째에 인수에 result로 작업 성공시 전달할 값의 구조를 가진다.