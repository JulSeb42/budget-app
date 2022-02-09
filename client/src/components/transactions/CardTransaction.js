// Packages
import React from "react"
import styled from "styled-components"
import { Font, Variables, Icon, ButtonsContainer } from "components-react-julseb"

// Components
import Amount from "../ui/Amount"

// Utils
import formatAmount from "../utils/formatAmount"
import unslugify from "../utils/unslugify"

// Styles
const ListTransactions = styled.div``

const Container = styled.div``

const Button = styled.button``

function CardTransaction({ transaction }) {
    return (
        <Container>
            <Font.H4>{transaction.title}</Font.H4>

            <Font.P>{unslugify(transaction.category)}</Font.P>

            <Amount
                className={
                    transaction.type === "income" ? "positive" : "negative"
                }
            >
                {formatAmount(transaction.amount)}
            </Amount>

            <ButtonsContainer>
                <Button>
                    <Icon name="edit" size={16} />
                </Button>

                <Button delete>
                    <Icon name="trash" size={16} />
                </Button>
            </ButtonsContainer>
        </Container>
    )
}

export { ListTransactions, CardTransaction }
