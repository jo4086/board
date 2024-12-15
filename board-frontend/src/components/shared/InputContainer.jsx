//  board\board-frontend\src\components\shared\InputContainer.jsx

import { InputContainer } from "../../styles/styledComponent"

const InputField = ({ label, name, type = 'text', ...props }) => {
   return (
      <InputContainer>
         <label htmlFor={name}>{label}</label>
         <input id={name} name={name} type={type} {...props} />
      </InputContainer>
   )
}

export default InputField