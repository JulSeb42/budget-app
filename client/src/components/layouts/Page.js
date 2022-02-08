// Packages
import React, { useContext } from "react"
import { useLocation } from "react-router-dom"
import { Helmet, Wrapper, Main } from "components-react-julseb"
import styled from "styled-components"

// Components
import { AuthContext } from "../../context/auth"
import Header from "./Header"
import AddModal from "../transactions/AddModal"

// Data
import SiteData from "../data/SiteData"

// Styles
const Container = styled(Wrapper)`
    grid-template-columns: 1fr 800px 1fr;
`

function Page(props) {
    const { isLoggedIn } = useContext(AuthContext)
    const location = useLocation().pathname

    return (
        <>
            <Helmet
                title={`${props.title} | ${SiteData.Name}`}
                description={props.description}
                keywords={props.keywords}
                siteName={SiteData.Name}
                favicon={SiteData.Favicon}
                author={SiteData.Author}
                type={SiteData.Type}
                cover={props.cover || SiteData.Cover}
                language={SiteData.Language}
            />

            {isLoggedIn && <Header />}

            {location === "/" ? (
                <Container>
                    <Main>{props.children}</Main>
                </Container>
            ) : (
                <Wrapper template={props.template}>
                    <Main>{props.children}</Main>
                </Wrapper>
            )}

            {isLoggedIn && <AddModal />}
        </>
    )
}

export default Page
