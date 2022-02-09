// Packages
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const Amount = styled.span`
    font-weight: ${Variables.FontWeights.Bold};

    &.positive {
        color: ${Variables.Colors.Success500};
    }

    &.negative {
        color: ${Variables.Colors.Danger500}
    }
`

export default Amount