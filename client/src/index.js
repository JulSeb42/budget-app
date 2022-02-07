// Packages
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

// Components
import { AuthProviderWrapper } from "./context/auth"
import App from "./App"

// Styles
import "components-react-julseb/dist/components/index.css"
import "./styles/root.css"

ReactDOM.render(
    <AuthProviderWrapper>
        <Router>
            <App />
        </Router>
    </AuthProviderWrapper>,
    document.getElementById("root")
)
