// Packages
import styled, { css } from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const Main = styled.main`
    padding: ${Variables.Margins.XL} 0;

    ${props =>
        props.template === "form" &&
        css`
            display: grid;
            gap: ${Variables.Margins.L};
        `}
`

export default Main
