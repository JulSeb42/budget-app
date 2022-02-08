// Packages
import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import {
    Modal,
    Form,
    Input,
    Variables,
    Font,
    getToday,
    InputContainer,
    slugify,
    Alert,
    Loader,
    Button,
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import { Selector, SelectorsContainer } from "../ui/Selector"

// Utils
import unslugify from "../utils/unslugify"

// Styles
const Container = styled(Form)`
    background-color: ${Variables.Colors.White};
    padding: ${Variables.Margins.M};
    max-width: 432px;
    border-radius: ${Variables.Radiuses.M};
`

function EditTransaction({ transaction }) {
    const { user } = useContext(AuthContext)

    // Modal
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        isOpen
            ? document.body.classList.add("stop-scrolling")
            : document.body.classList.remove("stop-scrolling")
    }, [isOpen])

    // Form
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`/users/user/${user._id}`)
            .then(res => {
                setCategories(res.data.categories.sort())
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [user._id])

    const [title, setTitle] = useState(transaction.title)
    const [amount, setAmount] = useState(transaction.amount)
    const [date, setDate] = useState(transaction.date)
    const [type, setType] = useState(transaction.type)
    const [category, setCategory] = useState(transaction.category)
    const [newCategory, setNewCategory] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const uniqCategories = [...new Set(categories)]

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

    const handleCancel = () => {
        setIsOpen(false)
        setTitle(transaction.title)
        setDate(transaction.date)
        setType(transaction.type)
        setCategory(transaction.category)
        setNewCategory("")
    }

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            title,
            amount,
            date,
            type,
            category: newCategory === "" ? category : slugify(newCategory),
            newCategory: newCategory !== "" && slugify(newCategory),
            user,
        }

        axios
            .put(
                `/transactions/edit-transaction/${transaction._id}`,
                requestBody
            )
            .then(() => window.location.reload(false))
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <>
            <Button btnstyle="text" nopadding onClick={() => setIsOpen(true)}>
                Edit
            </Button>

            <Modal className={isOpen ? "open" : ""}>
                <Container
                    btnprimary="Create a new transaction"
                    textbtnreset="Cancel"
                    onClickReset={handleCancel}
                    onSubmit={handleSubmit}
                >
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <Font.H4>Edit {transaction.title}</Font.H4>

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

                            <InputContainer label="Type of transaction">
                                <SelectorsContainer>
                                    <Selector
                                        label="Expense"
                                        id="expense"
                                        name="typeTransaction"
                                        defaultChecked={
                                            transaction.type === "expense" &&
                                            true
                                        }
                                        value="expense"
                                        onChange={handleType}
                                    />

                                    <Selector
                                        label="Income"
                                        id="income"
                                        name="typeTransaction"
                                        defaultChecked={
                                            transaction.type === "income" &&
                                            true
                                        }
                                        value="income"
                                        onChange={handleType}
                                    />
                                </SelectorsContainer>
                            </InputContainer>

                            <Input
                                label="Category"
                                type="select"
                                id="category"
                                onChange={handleCategory}
                                value={category}
                            >
                                {uniqCategories
                                    .filter(category => category !== false)
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

                            {errorMessage && (
                                <Alert color="danger">{errorMessage}</Alert>
                            )}
                        </>
                    )}
                </Container>
            </Modal>
        </>
    )
}

export default EditTransaction
