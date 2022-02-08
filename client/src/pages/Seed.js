// Packages
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Font, PageLoading } from "components-react-julseb"

import { AuthContext } from "../context/auth"
import Page from "../components/layouts/Page"

function Seed() {
    const { user } = useContext(AuthContext)

    const [transactions, setTransactions] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get("/transactions/transactions")
            .then(res => {
                setTransactions(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title="Seed">
            <Font.H1>Seed page</Font.H1>

            <Font.P>User id: {user._id}</Font.P>

            {transactions.length > 0 ? (
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction._id}>"{transaction._id}",</li>
                    ))}
                </ul>
            ) : (
                <Font.P>No transaction</Font.P>
            )}
        </Page>
    )
}

export default Seed
