// Packages
import React from "react"
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const SelectorsContainer = styled.div`
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
        margin-right: ${Variables.Margins.XS};
    }
`

const Container = styled.span`
    cursor: pointer;
`

const Input = styled.input`
    display: none;

    &:checked ~ label {
        background-color: ${Variables.Colors.Primary500};
        color: ${Variables.Colors.White};

        &:hover {
            background-color: ${Variables.Colors.Primary300};
        }
    }
`

const Label = styled.label`
    cursor: pointer;
    padding: ${Variables.Margins.XXS} ${Variables.Margins.S};
    background-color: ${Variables.Colors.Gray50};
    border-radius: ${Variables.Radiuses.Round};
    transition: ${Variables.Transitions.Short};

    &:hover {
        background-color: ${Variables.Colors.Primary300};
        color: ${Variables.Colors.White};
    }
`

function Selector(props) {
    return (
        <Container>
            <Input
                id={props.id}
                name={props.name}
                type={props.type || "radio"}
                {...props}
            />

            <Label htmlFor={props.id}>{props.label}</Label>
        </Container>
    )
}

export { SelectorsContainer, Selector }
