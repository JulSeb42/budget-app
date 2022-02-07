// Packages
import React from "react"
import styled from "styled-components"
import {
    Font,
    Variables,
    convertDateShort,
    TitleFlex,
    Button,
    ButtonsContainer,
    Grid,
} from "components-react-julseb"

// Utils
import unslugify from "../utils/unslugify"
import formatAmount from "../utils/formatAmount"

// Styles
const Container = styled(Grid)`
    padding: ${Variables.Margins.M};
    border-radius: ${Variables.Radiuses.M};
    background-color: ${Variables.Colors.White};
    box-shadow: ${Variables.Shadows.L};
`

const Amount = styled(Font.Strong)`
    text-align: right;
    width: 100%;

    &.positive {
        color: ${Variables.Colors.Success500};
    }

    &.negative {
        color: ${Variables.Colors.Danger500};
    }
`

const Date = styled(Font.P)`
    text-align: right;
    width: 100%;
    color: ${Variables.Colors.Gray500};
`

function CardTransaction({ transaction, ...props }) {
    return (
        <Container gap={Variables.Margins.S}>
            <TitleFlex>
                <Grid gap={Variables.Margins.XXS}>
                    <Font.H4>{transaction.title}</Font.H4>
                    <Font.P>{unslugify(transaction.category)}</Font.P>
                </Grid>

                <Grid gap={Variables.Margins.XXS}>
                    <Amount
                        className={
                            transaction.type === "income"
                                ? "positive"
                                : "negative"
                        }
                    >
                        {transaction.type === "income" ? "+" : "-"}{" "}
                        {formatAmount(transaction.amount, props.currency)}
                    </Amount>

                    <Date>{convertDateShort(transaction.date)}</Date>
                </Grid>
            </TitleFlex>

            <ButtonsContainer>
                <Button btnstyle="text" nopadding>
                    Edit
                </Button>

                <Button btnstyle="text" color="danger" nopadding>
                    Delete
                </Button>
            </ButtonsContainer>
        </Container>
    )
}

export default CardTransaction