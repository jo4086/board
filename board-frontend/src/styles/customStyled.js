import styled from 'styled-components'

export const Box = styled.div`
    box-sizing: border-box;
    display: ${(props) => props.$model || 'block'}; /* 기본값 block */
    gap: ${(props) => props.$gap || '0'};
    justify-content: ${(props) => props.$justify || 'flex-start'};
    align-items: ${(props) => props.$align || 'stretch'};
    flex-direction: ${(props) => (props.$model === 'flex' ? props.$direction || 'row' : 'unset')};

    background-color: ${(props) => props.$backgroundColor || 'transparent'};
    grid-template-columns: ${(props) => (props.$model === 'grid' ? props.$columns || 'repeat(3, 1fr)' : 'none')};
    grid-template-rows: ${(props) => (props.$model === 'grid' ? props.$rows || 'auto' : 'none')};
    width: 100%;
    max-width: ${(props) => props.$maxWidth || 'none'};
    padding: ${(props) => props.$padding || '0'};
    margin: ${(props) => props.$margin || '0 auto'};
    aspect-ratio: ${(props) => props.$aspectRatio || 'initial'}; // 추가
    border-radius: ${(props) => props.$borderRadius || 'initial'}; // 추가
    border: ${(props) => props.$border || '1px solid rgba(0,0,0,0.3)'}; // 추가
`
