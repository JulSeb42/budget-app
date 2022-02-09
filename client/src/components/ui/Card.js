// Packages
import styled from "styled-components"
import { Variables, Grid } from "components-react-julseb"

// Styles
const Card = styled(Grid)`
    padding: ${Variables.Margins.M};
    border-radius: ${Variables.Radiuses.M};
    background-color: ${Variables.Colors.White};
    box-shadow: ${Variables.Shadows.M};
    align-content: start;
`

export default Card
