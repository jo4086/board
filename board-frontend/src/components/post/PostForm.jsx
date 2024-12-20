import * as S from '../../styles/styledComponent'
import React, { useState, useCallback, useMemo } from 'react'
import { Button, InputField } from '../shared'

const PostForm = ({ onSubmit, initialValues = {} }) => {
    const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '') //이미지 경로(파일명 포함)
    const [imgFile, setImgFile] = useState(null) // 파일 객체
    const [content, setContent] = useState(initialValues.content || '') // 게시물 내용
    const [hashtags, setHashtags] = useState(initialValues.Hashtags ? initialValues.Hashtags.map((tag) => `#${tag.title}`).join(' ') : '')

    const handleImageChange = useCallback((e) => {
        const file = e.target.files && e.target.files[0] // 이미지 중 첫번째만 선택
        if (!file) return // 이미지파일 없을시 종료함

        setImgFile(file) // 이미지파일을 useState에 저장(imgFile)

        const reader = new FileReader() // 보여주기위해 파일리더 새로 생성

        reader.readAsDataURL(file) // 업로드한 파일을 Base64 URL로 변환 (이미지 미리보기에 자주 사용함)

        reader.onload = (e) => {
            setImgUrl(e.target.result) // data.image/jpg;base64, 영문들,,, Base64 URL로 변환 형태의 이미지 URL SET.
        }
    }, [])

    // 파일 전송(submit)
    const hanldeSubmit = useCallback(
        (e) => {
            e.preventDefault() // 화면 새로고침 방지
            if (!content.trim()) {
                alert('내용이 비어있습니다.')
                return
            }

            if (!imgFile && !initialValues.id) {
                alert('이미지 파일이 추가해주세요.')
                return
            }

            const formData = new FormData() // FormData형식 생성
            if (imgFile) {
                const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type }) // 파일 인코딩,,
                formData.append('img', encodedFile) // 이미지 파일 formData에 append
            }
            formData.append('content', content) // formData에 글내용 추가
            formData.append('hashtags', hashtags) // formData에 해시태그 추가

            onSubmit(formData) // 이미지와 content, hashtags의 정보가 담긴 formData 객체를를 onSubmit에 담아서 전송
        },
        [content, hashtags, imgFile, onSubmit, initialValues.id],
    )

    const submitBtnLabel = useMemo(() => (initialValues.id ? '수정하기' : '등록하기'), [initialValues.id])

    return (
        <S.Section style={{ justifyContent: 'left' }}>
            {/* <h1>PostForm 확인</h1> */}
            <form style={{ width: '100%' }} onSubmit={hanldeSubmit}>
                <Button as="label">
                    이미지 업로드
                    <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
                </Button>

                {imgUrl && (
                    <S.Box $mt={2.5} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <img src={imgUrl} alt="이미지 미리보기" style={{ width: '100%' }} />
                    </S.Box>
                )}

                <InputField multiline rows={6} fullWidth label="게시물 내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} />

                <InputField fullWidth placeholder="#해시 #태그" label="해시태그" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
                <Button type="submit">{submitBtnLabel}</Button>
            </form>
        </S.Section>
    )
}

export default PostForm
