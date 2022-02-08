// Packages
import React from "react"
import { Link } from "react-router-dom"
import { Font, Wrapper, Main } from "components-react-julseb"

// Components
import Page from "../components/layouts/Page"

function NotFound() {
    return (
        <Page title="Not found!">
            <Wrapper>
                <Main>
                    <Font.H1>Page not found!</Font.H1>

                    <Font.P>
                        <Link to="/">Back to homepage.</Link>
                    </Font.P>
                </Main>
            </Wrapper>
        </Page>
    )
}

export default NotFound
