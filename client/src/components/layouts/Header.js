// Packages
import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { Variables, Burger } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import ButtonNav from "../ui/ButtonNav"
import AddTransaction from "../transactions/AddTransaction"

// Data
// import SiteData from "../data/SiteData"

// Styles
const Container = styled.header`
    position: fixed;
    bottom: ${Variables.Margins.XXL};
    right: ${Variables.Margins.XXL};
    z-index: 100;
`

const OpenButton = styled.button`
    position: relative;
    --size: 48px;
    width: var(--size);
    height: var(--size);
    background-color: ${Variables.Colors.Primary500};
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${Variables.Transitions.Short};
    box-shadow: ${Variables.Shadows.L};
    z-index: 2;

    &:hover {
        background-color: ${Variables.Colors.Primary300};
        box-shadow: ${Variables.Shadows.XL};
    }
`

const Nav = styled.nav``

function Header() {
    const { logoutUser } = useContext(AuthContext)

    // Burger
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    useEffect(() => {
        isOpen
            ? document.body.classList.add("stop-scrolling")
            : document.body.classList.remove("stop-scrolling")
    }, [isOpen])

    return (
        <Container>
            <OpenButton onClick={() => setIsOpen(!isOpen)}>
                <Burger
                    aria-label="Open menu"
                    color="white"
                    className={open}
                    width={24}
                    height={16}
                    as="span"
                />
            </OpenButton>

            <Nav>
                <AddTransaction classBtn={`${open} first`} />

                <ButtonNav
                    to="/edit-account"
                    icon="user-circle"
                    aria-label="Edit account"
                    className={`${open} second`}
                />

                <ButtonNav
                    onClick={logoutUser}
                    icon="logout"
                    aria-label="Logout"
                    className={`${open} third`}
                />
            </Nav>
        </Container>
    )
}

export default Header
