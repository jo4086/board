//  board\board-frontend\src\components\shared\InputContainer.jsx

import { InputContainer } from "../../styles/styledComponent"

/* const InputField = ({ label, name, type = 'text', ...props }) => {
   return (
      <InputContainer>
         <label htmlFor={name}>{label}</label>
         <input id={name} name={name} type={type} {...props} />
      </InputContainer>
   )
}

export default InputField */



const InputField = ({ label, multiline, fullWidth = false, rows, name, type = 'text', ...props }) => {
    return (
        <InputContainer $fullWidth={fullWidth}>
            <label htmlFor={name}>{label}</label>
            {multiline ? <textarea id={name} rows={rows} name={name}  {...props}></textarea> : <input id={name} name={name} type={type} {...props} />}
        </InputContainer>
    )
}

export default InputField