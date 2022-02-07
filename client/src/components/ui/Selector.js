// Packages
import React from "react"
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const Container = styled.span``

const Input = styled.input`
    display: none;

    &:checked ~ label {
        background-color: ${Variables.Colors.Primary500};
        color: ${Variables.Colors.White};

        &:hover {
            background-color: ${Variables.Colors.Primary300};
            color: ${Variables.Colors.White};
        }
    }
`

const Label = styled.label`
    background-color: ${Variables.Colors.Gray50};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.S};
    border-radius: ${Variables.Radiuses.Round};
    transition: ${Variables.Transitions.Short};
    cursor: pointer;

    &:hover {
        background-color: ${Variables.Colors.Primary300};
        color: ${Variables.Colors.White};
    }
`

function Selector(props) {
    return (
        <Container>
            <Input
                type={props.type || "radio"}
                id={props.id}
                name={props.name}
                {...props}
            />

            <Label htmlFor={props.id}>{props.label}</Label>
        </Container>
    )
}

const SelectorsContainer = styled.div`
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
        margin-right: ${Variables.Margins.XS};
    }
`

export { Selector, SelectorsContainer }
