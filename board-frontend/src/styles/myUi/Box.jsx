import * as a from '../customStyled'

const Box = ({ model, gap, justify, align, direction, columns, rows, children, ...props }) => {
    // $ 접두어가 필요한 props 목록
    const styledPropsKeys = ['padding', 'margin', 'gap', 'columns', 'rows', 'backgroundColor', 'aspectRatio', 'borderRadius', 'border', 'maxWidth']

    // styled-components 전용 props로 리매핑
    const styledProps = Object.keys(props).reduce((acc, key) => {
        if (styledPropsKeys.includes(key)) {
            acc[`$${key}`] = props[key] // $ 접두어 추가
        }
        return acc
    }, {})

    return (
        <a.Box $model={model} $gap={gap} $justify={justify} $align={align} $direction={direction} $columns={columns} $rows={rows} {...styledProps}>
            {children}
        </a.Box>
    )
}
export default Box
