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

function Home() {
    const { user } = useContext(AuthContext)
    const [populatedUser, setPopulatedUser] = useState({})
    const [allTransactions, setAllTransactions] = useState([])
    const [allIncomes, setAllIncomes] = useState([])
    const [allExpenses, setAllExpenses] = useState([])
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

    console.log(allTransactions)

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
                        <Input label="Search" id="search" />

                        <Input
                            label="Filter by month"
                            id="filterMonth"
                            type="select"
                        >
                            <option value="all">All</option>
                        </Input>

                        <Input
                            label="Filter by category"
                            id="filterCategory"
                            type="select"
                        >
                            <option value="all">All</option>
                        </Input>

                        <Input
                            label="Filter by type"
                            id="filterType"
                            type="select"
                        >
                            <option value="all">All</option>
                            <option value="expense">Expenses</option>
                            <option value="income">Incomes</option>
                        </Input>
                    </Card>

                    {/* List incomes & expenses */}

                    <Card style={{ padding: `0 ${Variables.Margins.M} 0 ${Variables.Margins.M}`}}>
                        <ListTransactions>
                            {allTransactions.map(transaction => (
                                <CardTransaction
                                    transaction={transaction}
                                    key={transaction._id}
                                />
                            ))}
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
