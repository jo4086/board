// board\board-frontend\src\styles\styledComponent.js

import styled from 'styled-components'

export const NavUl = styled.ul`
    display: flex;
`

export const Nav = styled.nav`
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    //  justify-content: space-evenly;
    //  padding: 10px;
    background-color: gray;
    align-items: center;
`

export const Container = styled.div`
    width: 1200px;
    background-color: green;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 80px auto 0 auto;
`

export const Section = styled.section`
    width: 80%;
    justify-content: center;
    // height: 400px;
    // margin: 20px 0;
    margin: 20px auto;
    background-color: yellow;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
`

export const navLogin = styled.div`
    wdith: auto;
    padding: 5px 10px;
    margin: 10px 20px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    gap: 10px;
`

export const Button = styled.button`
    width: 100px;
    height: 60px;
    text-align: center;
    font-size: 1em;
    font-weight: bold;
    margin: 0 10px;
`

export const Input = styled.input`
    width: 60%;
    height: 40px;
    text-align: center;
    font-size: 14px;
    border: 1px solid black;
    outline: none;
`

export const InputContainer = styled.div`
    margin: 16px 0;
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;

    label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: #555;
    }

    input,
    textarea {
        width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

        // width: auto;
        // width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        box-sizing: border-box;

        &:focus {
            border-color: #4caf50;
        }
    }

    textarea {
        resize: none; /* 사용자가 크기를 조정하지 못하게 설정 */
        // min-height: 80px; /* 기본 높이 설정 */
        min-height: ${({ rows }) => (rows ? `${rows * 24}px` : '80px')};
    }
`

const StyledButton = styled.button`
    background-color: rgb(66, 145, 198);
    font-size: 1em;
    line-height: 30px;
    letter-spacing: 1.4px;
    height: auto;
    width: auto;
    font-weight: bold;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;

    &:hover {
        background-color: rgb(41, 121, 174);
    }
`
export const Box = styled.div`
    display: flex;
    width: ${({ $mt }) => ($mt ? `${$mt * 100}px` : 'auto')};
    height: ${({ $mt }) => ($mt ? `${$mt * 100}px` : 'auto')};
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.3);
    background-color:white;
    margin: 10px 2px;
    border-radius: 5px;
`



export default StyledButton // 기본으로 내보내기
