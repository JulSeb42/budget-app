// Packages
import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Icon, Variables } from "components-react-julseb"

// Styles
const Container = styled.button`
    --size: 48px;
    width: var(--size);
    height: var(--size);
    background-color: ${Variables.Colors.Gray50};
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${Variables.Transitions.Short};
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    color: ${Variables.Colors.Primary500};

    &:hover {
        background-color: ${Variables.Colors.Gray100};
    }

    &.open {
        &.first {
            bottom: calc(48px + 8px);
        }

        &.second {
            bottom: calc((48px + 8px) * 2);
        }

        &.third {
            bottom: calc((48px + 8px) * 3);
        }
    }
`

function ButtonNav(props) {
    return (
        <Container as={props.to && Link} {...props}>
            <Icon name={props.icon} size={24} />
        </Container>
    )
}

export default ButtonNav
