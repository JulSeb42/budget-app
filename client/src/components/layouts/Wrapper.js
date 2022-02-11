// Packages
import styled, { css } from "styled-components"

// Styles
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 5vw 1fr 5vw;

    ${props =>
        props.template === "form" &&
        css`
            grid-template-columns: 1fr 400px 1fr;
        `}

    & > * {
        grid-column: 2;
    }
`

export default Wrapper