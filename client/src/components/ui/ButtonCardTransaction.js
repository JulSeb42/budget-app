// Packages
import React from "react"
import styled from "styled-components"
import { Variables, Icon } from "components-react-julseb"

// Styles
const Container = styled.button`
    --size: 32px;
    width: var(--size);
    height: var(--size);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    background-color: ${Variables.Colors.Gray50};
    color: ${props =>
        props.delete
            ? Variables.Colors.Danger500
            : Variables.Colors.Primary500};
    transition: ${Variables.Transitions.Short};

    &:hover {
        background-color: ${Variables.Colors.Gray100};
    }
`

function ButtonCardTransaction(props) {
    return (
        <Container {...props}>
            <Icon name={props.icon} size={16} />
        </Container>
    )
}

export default ButtonCardTransaction
