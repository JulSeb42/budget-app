// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate, Navigate, Link } from "react-router-dom"
import { Font, Form, Input, Alert, Wrapper, Main } from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"

function Login() {
    const { loginUser, isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { email, password }

        axios
            .put("/auth/login", requestBody)
            .then(res => {
                loginUser(res.data)
                navigate("/")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return isLoggedIn ? (
        <Navigate to="/" />
    ) : (
        <Page title="Login">
            <Wrapper template="form">
                <Main>
                    <Font.H1>Login</Font.H1>

                    <Form onSubmit={handleSubmit} btnprimary="Log in">
                        <Input
                            label="Email"
                            type="email"
                            id="email"
                            onChange={handleEmail}
                            value={email}
                        />

                        <Input
                            label="Password"
                            inputtype="password"
                            id="password"
                            onChange={handlePassword}
                            value={password}
                            password
                        />
                    </Form>

                    <Font.P>
                        <Link to="/login/forgot-password">
                            I forgot my password.
                        </Link>
                    </Font.P>

                    <Font.P>
                        You don't have an account?{" "}
                        <Link to="/signup">Signup</Link>
                    </Font.P>

                    {errorMessage && (
                        <Alert color="danger">{errorMessage}</Alert>
                    )}
                </Main>
            </Wrapper>
        </Page>
    )
}

export default Login
