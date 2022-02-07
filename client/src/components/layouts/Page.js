// Packages
import React from "react"
import { Helmet, Wrapper, Main } from "components-react-julseb"

// Components
import Header from "./Header"

// Data
import SiteData from "../data/SiteData"

function Page(props) {
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

            <Header />

            <Wrapper template={props.template}>
                <Main>{props.children}</Main>
            </Wrapper>
        </>
    )
}

export default Page
