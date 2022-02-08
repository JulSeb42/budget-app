// Packages
import React from "react"
import styled from "styled-components"
import { Input, Grid, Variables } from "components-react-julseb"

// Utils
import convertMonth from "./utils/convertMonth"
import unslugify from "./utils/unslugify"

// Styles
const Container = styled(Grid)`
    align-content: start;
`

function FiltersHome(props) {
    return (
        <Container as="aside" gap={Variables.Margins.S}>
            <Input
                label="Search"
                id="search"
                onChange={props.onChangeSearch}
                value={props.valueSearch}
            />

            <Input
                label="Filter by month"
                id="filterMonth"
                type="select"
                onChange={props.onChangeFilterMonth}
                value={props.valueFilterMonth}
            >
                <option value="all">All</option>

                {props.optionsMonth.map((option, i) => (
                    <option value={option} key={i}>
                        {convertMonth(option)}
                    </option>
                ))}
            </Input>

            <Input
                label="Filter by category"
                id="filterCategory"
                type="select"
                onChange={props.onChangeFilterCategory}
                value={props.valueFilterCategory}
            >
                <option value="all">All</option>

                {props.optionsCategories.map((option, i) => (
                    <option value={option} key={i}>
                        {unslugify(option)}
                    </option>
                ))}
            </Input>

            <Input
                label="Type"
                id="show"
                type="select"
                onChange={props.onChangeFilterType}
                value={props.valueFilterType}
            >
                <option value="all">All</option>
                <option value="expense">Expenses</option>
                <option value="income">Incomes</option>
            </Input>
        </Container>
    )
}

export default FiltersHome
