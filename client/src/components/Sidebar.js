// Packages
import React, { useState } from "react"
import styled from "styled-components"

const SidebarContainer = styled.aside`
    width: ${props => (props.isOpen ? "100%" : 0)};
`

function Sidebar(props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)}>Open sidebar</button>
            <SidebarContainer isOpen={isOpen}>...your content</SidebarContainer>
        </>
    )
}

export default Sidebar
