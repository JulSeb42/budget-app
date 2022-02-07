// Packages
import React from "react"
import styled from "styled-components"
import { Font, Grid, Variables, getFirstName } from "components-react-julseb"

// Utils
import formatAmount from "../utils/formatAmount"

// Styles
const Container = styled(Grid)`
    border: 1px solid ${Variables.Colors.Gray200};
    padding: ${Variables.Margins.M};
    border-radius: ${Variables.Radiuses.M};
`

const Balance = styled.span`
    &.positive {
        color: ${Variables.Colors.Success500};
    }

    &.negative {
        color: ${Variables.Colors.Danger500};
    }
`

function UserCard({ user }) {
    const allIncomes = user.transactions
        .filter(transaction => transaction.type === "income")
        .map(income => income.amount)
        .reduce((partialSum, a) => partialSum + a, 0)

    const allExpenses = user.transactions
        .filter(transaction => transaction.type === "expense")
        .map(expense => expense.amount)
        .reduce((partialSum, a) => partialSum + a, 0)

    const monthIncomes = user.transactions
        .filter(transaction => transaction.type === "income")
        .filter(
            transaction =>
                new Date(transaction.date).getMonth() === new Date().getMonth()
        )
        .map(income => income.amount)
        .reduce((partialSum, a) => partialSum + a, 0)

    const monthExpenses = user.transactions
        .filter(
            transaction =>
                new Date(transaction.date).getMonth() === new Date().getMonth()
        )
        .filter(transaction => transaction.type === "expense")
        .map(expense => expense.amount)
        .reduce((partialSum, a) => partialSum + a, 0)

    const balance = allIncomes - allExpenses

    return (
        <Container gap={Variables.Margins.S}>
            <Font.H1>Hello {getFirstName(user.fullName)}</Font.H1>

            <Font.H4>
                Your balance:{" "}
                <Balance className={balance >= 0 ? "positive" : "negative"}>
                    {formatAmount(balance, user.currency)}
                </Balance>
            </Font.H4>

            <Font.P>
                This month, you earned{" "}
                {formatAmount(monthIncomes, user.currency)}, and spent{" "}
                {formatAmount(monthExpenses, user.currency)}
            </Font.P>
        </Container>
    )
}

export default UserCard
