// Packages
import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import {
    Font,
    Form,
    Input,
    Alert,
    Wrapper, 
    Main,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import Page from "../../components/layouts/Page"
import DangerZone from "../../components/DangerZone"

function EditAccount({ edited, setEdited }) {
    const { user, updateUser, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState(user.fullName)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleFullName = e => setFullName(e.target.value)

    // Edit account
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { id: user._id, fullName }

        axios
            .put("/users/edit", requestBody)
            .then(res => {
                const { user } = res.data
                updateUser(user)
                setEdited(!edited)
                navigate("/")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Delete account
    const handleDelete = () => {
        axios
            .delete(`/users/delete-user/${user._id}`)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Edit your account">
            <Wrapper template="form">
                <Main>
                    <Font.H1>Edit your account</Font.H1>

                    <Form
                        btnprimary="Save changes"
                        btncancel="/"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            label="Full name"
                            id="fullName"
                            onChange={handleFullName}
                            value={fullName}
                        />

                        <Input
                            label="Email"
                            type="email"
                            id="email"
                            value={user.email}
                            disabled
                        />
                    </Form>

                    {errorMessage && (
                        <Alert color="danger">{errorMessage}</Alert>
                    )}

                    <Font.P>
                        <Link to="//edit-password">
                            Edit your password.
                        </Link>
                    </Font.P>

                    <DangerZone
                        onClickPrimary={handleDelete}
                        textbtnopen="Delete your account"
                        text="Are you sure you want to delete your account?"
                        textbtndelete="Yes, delete my account"
                    />
                </Main>
            </Wrapper>
        </Page>
    )
}

export default EditAccount
