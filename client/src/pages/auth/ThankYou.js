// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import Page from "../../components/layouts/Page"

// Title
const title = "Thank you for creating your account!"

function ThankYou() {
    return (
        <Page title={title}>
            <Font.H1>{title}</Font.H1>

            <Font.P>
                You are now logged in. We just sent you an email to verify your
                account, please click on the link to access all the
                functionalities.
            </Font.P>
        </Page>
    )
}

export default ThankYou
