// Packages
import React, { useState, useEffect, useContext } from "react"
import { PageLoading, Font, Grid, Variables } from "components-react-julseb"
import axios from "axios"

// Components
import { AuthContext } from "../context/auth"
import Page from "../components/layouts/Page"
import UserCard from "../components/user/UserCard"
import CardTransaction from "../components/transactions/CardTransaction"
import LayoutHome from "../components/layouts/LayoutHome"
import FiltersHome from "../components/FiltersHome"

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

    // Search
    const [userTransactions, setUserTransactions] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (!isLoading) {
            setUserTransactions(populatedUser.transactions)
            setAllCategories(
                populatedUser.transactions.map(
                    transaction => transaction.category
                )
            )
        }
    }, [isLoading, populatedUser])

    const handleSearch = e => setSearch(e.target.value)

    let results = userTransactions.filter(transaction =>
        transaction.title.toLowerCase().includes(search.toLowerCase())
    )

    // Get all months
    let allMonths = userTransactions
        .map(transaction => transaction.dateShort)
        .sort((a, b) => new Date(b) - new Date(a))
    const uniqMonths = [...new Set(allMonths)]

    // Filter by month
    const [month, setMonth] = useState("all")
    const handleMonth = e => setMonth(e.target.value)

    if (month !== "all") {
        results = results.filter(transaction => transaction.dateShort === month)
    }

    // Filter by category
    const [allCategories, setAllCategories] = useState([])
    const uniqCategories = [...new Set(allCategories)].sort()

    const [category, setCategory] = useState("all")
    const handleCategory = e => setCategory(e.target.value)

    if (category !== "all") {
        results = results.filter(transaction => transaction.category === category)
    }

    // Filter by type
    const [type, setType] = useState("all")
    const handleType = e => setType(e.target.value)

    if (type !== "all") {
        results = results.filter(transaction => transaction.type === type)
    }

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title="Home">
            <UserCard user={populatedUser} />

            <LayoutHome>
                <FiltersHome
                    onChangeSearch={handleSearch}
                    valueSearch={search}
                    optionsMonth={uniqMonths}
                    onChangeFilterMonth={handleMonth}
                    valueMonth={month}
                    optionsCategories={uniqCategories}
                    onChangeFilterCategory={handleCategory}
                    valueFilterCategory={category}
                    onChangeFilterType={handleType}
                    valueFilterType={type}
                />

                <Grid
                    gap={Variables.Margins.M}
                    style={{ alignContent: "start" }}
                >
                    {populatedUser.transactions.length > 0 ? (
                        results.length > 0 ? (
                            results
                                .sort((a, b) => {
                                    return (
                                        new Date(b.dateAdded) -
                                        new Date(a.dateAdded)
                                    )
                                })
                                .map(transaction => (
                                    <CardTransaction
                                        transaction={transaction}
                                        currency={populatedUser.currency}
                                        key={transaction._id}
                                    />
                                ))
                        ) : (
                            <Font.P>
                                Your search did not return anything.
                            </Font.P>
                        )
                    ) : (
                        <Font.P>No transaction yet.</Font.P>
                    )}
                </Grid>
            </LayoutHome>
        </Page>
    )
}

export default Home
