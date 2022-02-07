// Packages
import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import {
    ButtonIcon,
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
} from "components-react-julseb"

// Components
import { AuthContext } from "../../context/auth"
import { Selector, SelectorsContainer } from "../ui/Selector"

// Utils
import unslugify from "../utils/unslugify"

// Styles
const AddButton = styled(ButtonIcon)`
    position: fixed;
    bottom: ${Variables.Margins.XXL};
    right: ${Variables.Margins.XXL};
    box-shadow: ${Variables.Shadows.L};
`

const Container = styled(Form)`
    background-color: ${Variables.Colors.White};
    padding: ${Variables.Margins.M};
    max-width: 432px;
    border-radius: ${Variables.Radiuses.M};
`

function AddModal() {
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

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(getToday())
    const [type, setType] = useState("expense")
    const [category, setCategory] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    useEffect(() => {
        if (!isLoading && categories.length > 0) {
            setCategory(categories[0])
        } 
    }, [categories, isLoading])

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
        setTitle("")
        setDate(getToday())
        setType("expense")
        setCategory("")
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
            .post("/transactions/new-transaction", requestBody)
            .then(() => window.location.reload(false))
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <>
            <AddButton
                icon="plus"
                color="primary"
                onClick={() => setIsOpen(true)}
            />

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
                            <Font.H4>Add a new transaction</Font.H4>

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

                            {categories.length > 0 && (
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
                            )}

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

export default AddModal
