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
    width: 100%;
    justify-content: center;
    height: 400px;
    margin: 20px 0;
    background-color: yellow;
    display: flex;
    padding:20px;
    box-sizing:border-box;
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
    outline:none;
`
