// Packages
import styled from "styled-components"

// Styles
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 5vw 1fr 5vw;

    & > * {
        grid-column: 2;
    }
`

export default Wrapper