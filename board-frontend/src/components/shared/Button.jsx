import StyledButton from "../../styles/styledComponent"

const Button = ({ component = 'button', type, children, ...props }) => {
    return (
        <StyledButton
            as={component} // component가 없으면 기본적으로 'button' 사용
            type={component === 'button' ? type : undefined} // 버튼일 때만 type 적용
            {...props}>
            {children}
        </StyledButton>
    )
}

export default Button
