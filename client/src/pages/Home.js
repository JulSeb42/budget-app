// Packages
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import {
    Font,
    getFirstName,
    Grid,
    PageLoading,
    Variables,
    Input,
} from "components-react-julseb"

// Components
import { AuthContext } from "../context/auth"
import Page from "../components/layouts/Page"
import Card from "../components/ui/Card"
import Amount from "../components/ui/Amount"
import AsymGrid from "../components/layouts/AsymGrid"
import {
    CardTransaction,
    ListTransactions,
} from "../components/transactions/CardTransaction"

// Utils
import formatAmount from "../components/utils/formatAmount"
import convertMonth from "../components/utils/convertMonth"
import unslugify from "../components/utils/unslugify"

function Home() {
    const { user } = useContext(AuthContext)
    const [populatedUser, setPopulatedUser] = useState({})
    const [allTransactions, setAllTransactions] = useState([])
    const [allIncomes, setAllIncomes] = useState([])
    const [allExpenses, setAllExpenses] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`/users/user/${user._id}`)
            .then(res => {
                setPopulatedUser(res.data)
                setAllTransactions(
                    res.data.transactions.sort(
                        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
                    )
                )
                setAllIncomes(
                    res.data.transactions.filter(
                        transaction => transaction.type === "income"
                    )
                )
                setAllExpenses(
                    res.data.transactions.filter(
                        transaction => transaction.type === "expense"
                    )
                )
                setAllCategories([...new Set(res.data.categories)])
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [user._id])

    const totalIncomes = allIncomes
        .map(transaction => transaction.amount)
        .reduce((partialSum, a) => partialSum + a, 0)

    const totalExpenses = allExpenses
        .map(transaction => transaction.amount)
        .reduce((partialSum, a) => partialSum + a, 0)

    const balance = totalIncomes - totalExpenses

    // Search
    const [search, setSearch] = useState("")
    const handleSearch = e => setSearch(e.target.value)

    let results = allTransactions.filter(transaction =>
        transaction.title.toLowerCase().includes(search.toLowerCase())
    )

    // Filter month
    let allMonths = allTransactions
        .map(transaction => transaction.dateShort)
        .sort((a, b) => new Date(b) - new Date(a))
    const uniqMonths = [...new Set(allMonths)]

    const [month, setMonth] = useState("all")
    const handleMonth = e => setMonth(e.target.value)

    if (month !== "all") {
        results = results.filter(transaction => transaction.dateShort === month)
    }

    // Filter category
    const uniqCategories = [...new Set(allCategories)].sort()

    const [category, setCategory] = useState("all")
    const handleCategory = e => setCategory(e.target.value)

    if (category !== "all") {
        results = results.filter(
            transaction => transaction.category === category
        )
    }

    // Filter type
    const [type, setType] = useState("all")
    const handleType = e => setType(e.target.value)

    if (type !== "all") {
        results = results.filter(transaction => transaction.type === type)
    }

    return isLoading ? (
        <PageLoading />
    ) : (
        <Page title="Home">
            <Grid>
                <Grid col={3}>
                    <Card>
                        <Font.H1>
                            Hello {getFirstName(populatedUser.fullName)}
                        </Font.H1>
                    </Card>

                    <Card gap={Variables.Margins.XS}>
                        <Font.P>Your balance</Font.P>

                        <Font.H4>
                            <Amount
                                className={
                                    balance >= 0 ? "positive" : "negative"
                                }
                            >
                                {formatAmount(balance)}
                            </Amount>
                        </Font.H4>
                    </Card>

                    <Card gap={Variables.Margins.XS}>
                        <Font.P>
                            Total incomes:{" "}
                            <Amount className="positive">
                                {formatAmount(totalIncomes)}
                            </Amount>
                        </Font.P>

                        <Font.P>
                            Total expenses:{" "}
                            <Amount className="negative">
                                {formatAmount(totalExpenses)}
                            </Amount>
                        </Font.P>
                    </Card>
                </Grid>

                <AsymGrid>
                    {/* Filters */}
                    <Card gap={Variables.Margins.XS}>
                        <Input
                            label="Search"
                            id="search"
                            onChange={handleSearch}
                            value={search}
                        />

                        <Input
                            label="Filter by month"
                            id="filterMonth"
                            type="select"
                            onChange={handleMonth}
                            value={month}
                        >
                            <option value="all">All</option>

                            {uniqMonths.map((month, i) => (
                                <option value={month} key={i}>
                                    {convertMonth(month)}
                                </option>
                            ))}
                        </Input>

                        <Input
                            label="Filter by category"
                            id="filterCategory"
                            type="select"
                            onChange={handleCategory}
                            value={category}
                        >
                            <option value="all">All</option>

                            {uniqCategories.map((category, i) => (
                                <option value={category} key={i}>
                                    {unslugify(category)}
                                </option>
                            ))}
                        </Input>

                        <Input
                            label="Filter by type"
                            id="filterType"
                            type="select"
                            onChange={handleType}
                            value={type}
                        >
                            <option value="all">All</option>
                            <option value="expense">Expenses</option>
                            <option value="income">Incomes</option>
                        </Input>
                    </Card>

                    {/* List incomes & expenses */}

                    <Card
                        style={{
                            padding: `0 ${Variables.Margins.M} 0 ${Variables.Margins.M}`,
                        }}
                    >
                        <ListTransactions>
                            {allTransactions.length > 0 ? (
                                results.length > 0 ? (
                                    results.map(transaction => (
                                        <CardTransaction
                                            transaction={transaction}
                                            key={transaction._id}
                                        />
                                    ))
                                ) : (
                                    <Font.P
                                        style={{
                                            marginTop: Variables.Margins.M,
                                        }}
                                    >
                                        Your search did not return anything.
                                    </Font.P>
                                )
                            ) : (
                                <Font.P
                                    style={{ marginTop: Variables.Margins.M }}
                                >
                                    No transaction yet.
                                </Font.P>
                            )}
                        </ListTransactions>
                    </Card>
                </AsymGrid>

                <Grid>
                    {/* List categories => slideshow, add filter expenses / incomes */}
                </Grid>
            </Grid>
        </Page>
    )
}

export default Home
