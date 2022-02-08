// Packages
import React from "react"
import { Font, Wrapper, Main } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

function Goodbye() {
    return (
        <Page title="Goodbye!">
            <Wrapper>
                <Main>
                    <Font.H1>We're sorry to see you go!</Font.H1>

                    <Font.P>Your account was deleted successfully.</Font.P>
                </Main>
            </Wrapper>
        </Page>
    )
}

export default Goodbye
