// Packages
import React, { useState, useEffect, useContext } from "react"
import { PageLoading, Font } from "components-react-julseb"
import axios from "axios"

// Components
import { AuthContext } from "../context/auth"
import Page from "../components/layouts/Page"
import UserCard from "../components/user/UserCard"
import CardTransaction from "../components/transactions/CardTransaction"

function Home() {
    const { user } = useContext(AuthContext)

    const [populatedUser, setPopulatedUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`/users/user/${user._id}`)
            .then(res => {
                setPopulatedUser(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [user._id, isLoading])

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title="Home">
            <UserCard user={populatedUser} />

            {populatedUser.transactions.length > 0 ? (
                populatedUser.transactions
                    .sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    })
                    .map(transaction => (
                        <CardTransaction
                            transaction={transaction}
                            currency={populatedUser.currency}
                            key={transaction._id}
                        />
                    ))
            ) : (
                <Font.P>No transaction yet.</Font.P>
            )}
        </Page>
    )
}

export default Home
