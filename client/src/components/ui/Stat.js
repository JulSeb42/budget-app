// Packages
import React from "react"
import styled from "styled-components"
import { Variables, ProgressBar, Grid, Font } from "components-react-julseb"

// Utils
import FormatAmount from "../utils/FormatAmount"
import calculateTotalSum from "../utils/calculateTotalSum"
import getAllTransactions from "../utils/getAllTransactions"
import getPercentage from "../utils/getPercentage"
import unslugify from "../utils/unslugify"
import getLengthTransactions from "../utils/getLengthTransactions"

const Row = styled(Grid)`
    p {
        text-align: center;
        color: ${Variables.Colors.Gray500};
    }

    strong:last-child {
        text-align: right;
        color: ${Variables.Colors.Primary500};
    }
`

function Stat(props) {
    return (
        <Grid gap={Variables.Margins.S}>
            <Row col={3} gap={Variables.Margins.XS}>
                <Font.Strong>{unslugify(props.category)}</Font.Strong>

                <Font.P>
                    {getLengthTransactions(
                        props.allTransactions,
                        props.category
                    )}{" "}
                    transactions
                </Font.P>

                <Font.Strong>
                    {FormatAmount(
                        calculateTotalSum(
                            getAllTransactions(
                                props.allTransactions,
                                props.category
                            )
                        )
                    )}
                </Font.Strong>
            </Row>

            <ProgressBar
                value={getPercentage(
                    calculateTotalSum(
                        getAllTransactions(
                            props.allTransactions,
                            props.category
                        )
                    ),
                    props.totalExpenses
                )}
            />
        </Grid>
    )
}

export default Stat
