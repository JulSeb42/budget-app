// Packages
import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import {
    Modal,
    Form,
    Input,
    Font,
    Variables,
    getToday,
    InputContainer,
    Loader,
    Alert,
    slugify,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import ButtonNav from "../ui/ButtonNav"
import { Selector, SelectorsContainer } from "../ui/Selector"

// Utils
import unslugify from "../utils/unslugify"
import convertToDateShort from "../utils/convertToDateShort"

// Styles
const Container = styled(Form)`
    background-color: ${Variables.Colors.White};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Margins.M};
    max-width: calc(400px + (${Variables.Margins.M} * 2));
`

function AddTransaction(props) {
    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`/users/user/${user._id}`)
            .then(res => {
                setAllCategories(res.data.categories)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [user._id])

    const [isOpen, setIsOpen] = useState(false)

    const [allCategories, setAllCategories] = useState([])

    // Form
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(getToday())
    const [type, setType] = useState("expense")
    const [category, setCategory] = useState(allCategories[0])
    const [newCategory, setNewCategory] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleTitle = e => setTitle(e.target.value)
    const handleAmount = e => setAmount(e.target.value)
    const handleDate = e => setDate(e.target.value)

    const handleType = e => {
        if (e.target.checked) {
            setType(e.target.value)
        }
    }

    const handleCategory = e => setCategory(e.target.value)
    const handleNewCategory = e => setNewCategory(e.target.value)

    const handleReset = () => {
        setIsOpen(false)
        setTitle("")
        setAmount("")
        setDate(getToday())
        setType("expense")
        setCategory(allCategories[0])
        setNewCategory("")
        setErrorMessage(undefined)
    }

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            title,
            amount,
            date,
            dateShort: convertToDateShort(date),
            type,
            category: newCategory === "" ? category : slugify(newCategory),
            newCategory: newCategory !== "" && slugify(newCategory),
            user,
        }

        axios
            .post("/transactions/new-transaction", requestBody)
            .then(() => window.location.reload(false))
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <>
            <ButtonNav
                icon="plus"
                aria-label="Add a new transaction"
                className={props.classBtn}
                onClick={() => setIsOpen(true)}
            />

            <Modal className={isOpen ? "open" : ""}>
                <Container
                    btnprimary="Add transaction"
                    textbtnreset="Cancel"
                    onClickReset={handleReset}
                    onSubmit={handleSubmit}
                >
                    <Font.H4>New transaction</Font.H4>

                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <Input
                                label="Title"
                                id="title"
                                onChange={handleTitle}
                                value={title}
                            />

                            <Input
                                label="Amount"
                                id="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                onChange={handleAmount}
                                value={amount}
                            />

                            <Input
                                label="Date"
                                id="date"
                                type="date"
                                max={getToday()}
                                onChange={handleDate}
                                value={date}
                            />

                            <InputContainer label="Type">
                                <SelectorsContainer>
                                    <Selector
                                        label="Expense"
                                        id="expense"
                                        name="typeTransaction"
                                        defaultChecked={true}
                                        value="expense"
                                        onChange={handleType}
                                    />

                                    <Selector
                                        label="Income"
                                        id="income"
                                        name="typeTransaction"
                                        value="income"
                                        onChange={handleType}
                                    />
                                </SelectorsContainer>
                            </InputContainer>

                            <Input
                                label="Category"
                                id="category"
                                type="select"
                                onChange={handleCategory}
                                value={category}
                            >
                                {allCategories
                                    .filter(category => category !== false)
                                    .sort()
                                    .map((category, i) => (
                                        <option value={category} key={i}>
                                            {unslugify(category)}
                                        </option>
                                    ))}
                            </Input>

                            <Input
                                label="Add a new category"
                                id="newCategory"
                                onChange={handleNewCategory}
                                value={newCategory}
                            />
                        </>
                    )}

                    {errorMessage && (
                        <Alert color="danger">{errorMessage}</Alert>
                    )}
                </Container>
            </Modal>
        </>
    )
}

export default AddTransaction
