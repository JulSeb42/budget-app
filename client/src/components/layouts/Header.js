// Packages
import React, { useContext, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"

// Data
import SiteData from "../data/SiteData"

// Styles
const Container = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${Variables.Margins.L} 5vw;
    background-color: ${Variables.Colors.Primary500};

    a, button {
        color: ${Variables.Colors.White};
    }
`

const Burger = styled.button`
    display: none;

    @media ${Variables.Breakpoints.Mobile} {
        display: inline;
        position: relative;
        background: none;
        border: none;
        padding: 0;
        width: 30px;
        height: 20px;

        span {
            width: 100%;
            background-color: black;
            height: 2px;
            position: absolute;
            left: 0;
            transition: ${Variables.Transitions.Short};

            &:first-child {
                top: 0;
            }

            &:nth-child(2) {
                top: calc(50% - 2px / 2);
            }

            &:last-child {
                bottom: 0;
            }
        }

        &.open span {
            &:first-child {
                transform: rotate(45deg);
                top: 45%;
            }

            &:nth-child(2) {
                width: 0;
            }

            &:last-child {
                transform: rotate(-45deg);
                bottom: 45%;
            }
        }
    }
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media ${Variables.Breakpoints.Mobile} {
        position: absolute;
        width: 100%;
        background-color: white;
        left: 0;
        top: -200px;
        padding: 0 5vw ${Variables.Margins.S} 5vw;
        flex-direction: column;
        align-items: flex-start;
        transition: ${Variables.Transitions.Short};

        &.open {
            top: 72px;
        }
    }
`

const LinkNav = styled(NavLink)`
    color: black;
    font-family: ${Variables.FontFamilies.Body};
    font-size: ${Variables.FontSizes.Body};
    text-decoration: none;
    border: none;
    padding: 0;
    background: none;

    &.active {
        font-weight: ${Variables.FontWeights.Bold};
    }

    &:not(:last-child) {
        margin-right: ${Variables.Margins.M};
    }
`

function Header() {
    const { isLoggedIn, logoutUser } = useContext(AuthContext)

    // Burger
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    return (
        <Container>
            <LinkNav as={Link} to="/">
                {SiteData.Name}
            </LinkNav>

            <Burger className={open} onClick={() => setIsOpen(!isOpen)}>
                <span />
                <span />
                <span />
            </Burger>

            <Nav className={open}>
                <LinkNav to="/">Home</LinkNav>

                {isLoggedIn ? (
                    <>
                        <LinkNav to="/my-account">My account</LinkNav>
                        <LinkNav as="button" onClick={logoutUser}>
                            Log out
                        </LinkNav>
                    </>
                ) : (
                    <>
                        <LinkNav to="/login">Login</LinkNav>
                    </>
                )}
            </Nav>
        </Container>
    )
}

export default Header
