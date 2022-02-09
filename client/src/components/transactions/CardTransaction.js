// Packages
import React from "react"
import styled from "styled-components"
import {
    Font,
    Variables,
    ButtonsContainer,
    Grid,
} from "components-react-julseb"

// Components
import Amount from "../ui/Amount"
import EditTransaction from "./EditTransaction"
import DeleteTransaction from "./DeleteTransaction"

// Utils
import formatAmount from "../utils/formatAmount"
import unslugify from "../utils/unslugify"

// Styles
const ListTransactions = styled(Grid)`
    max-height: 100%;
    overflow-y: scroll;
    gap: ${Variables.Margins.S};

    & > div:first-child {
        margin-top: ${Variables.Margins.M};
    }

    & > div:last-child {
        margin-bottom: ${Variables.Margins.M};
    }

    & > div:not(:last-child) {
        padding-bottom: ${Variables.Margins.S};
        border-bottom: 1px solid ${Variables.Colors.Gray100};
    }
`

const Container = styled(Grid)``

const Price = styled(Amount)`
    justify-self: center;
`

const Buttons = styled(ButtonsContainer)`
    justify-content: flex-end;
`

function CardTransaction({ transaction }) {
    return (
        <Container col={3}>
            <Grid as="span" gap={Variables.Margins.XXS}>
                <Font.H4>{transaction.title}</Font.H4>

                <Font.P>{unslugify(transaction.category)}</Font.P>
            </Grid>

            <Price
                className={
                    transaction.type === "income" ? "positive" : "negative"
                }
            >
                {formatAmount(transaction.amount)}
            </Price>

            <Buttons>
                <EditTransaction transaction={transaction} />

                <DeleteTransaction transaction={transaction} />

                {/* <Button delete>
                    <Icon name="trash" size={16} />
                </Button> */}
            </Buttons>
        </Container>
    )
}

export { ListTransactions, CardTransaction }
