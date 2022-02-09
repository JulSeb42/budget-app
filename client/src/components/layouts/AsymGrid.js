// Packages
import styled from "styled-components"
import { Variables } from "components-react-julseb"

const AsymGrid = styled.div`
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: ${Variables.Margins.L};

    & > div {
        height: 60vh;
    }
`

export default AsymGrid