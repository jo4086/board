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
   width: 100%;
   justify-content: center;
   height: 400px;
   margin: 20px 0;
   background-color: yellow;
   display: flex;
   padding: 20px;
   box-sizing: border-box;
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

   label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      color: #555;
   }

   input {
      width: 100%;
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
`
