// Packages
import React, { useContext } from "react"
import { Helmet, Wrapper, Main } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Header from "./Header"
import AddModal from "../transactions/AddModal"

// Data
import SiteData from "../data/SiteData"

function Page(props) {
    const { isLoggedIn } = useContext(AuthContext)

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

            <Wrapper template={props.template}>
                <Main>{props.children}</Main>
            </Wrapper>

            {isLoggedIn && <AddModal />}
        </>
    )
}

export default Page
