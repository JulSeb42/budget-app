// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"
import {
    Alert,
    Button,
    Modal,
    Font,
    ButtonsContainer,
} from "components-react-julseb"

// Components
import ButtonCardTransaction from "../ui/ButtonCardTransaction"

function DeleteTransaction({ transaction }) {
    // Modal
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        isOpen
            ? document.body.classList.add("stop-scrolling")
            : document.body.classList.remove("stop-scrolling")
    }, [isOpen])

    // Handle
    const handleDelete = e => {
        e.preventDefault()

        axios
            .delete(`/transactions/delete-transaction/${transaction._id}`)
            .then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    return (
        <>
            <ButtonCardTransaction
                delete
                icon="trash"
                onClick={() => setIsOpen(true)}
            />

            <Modal className={isOpen ? "open" : ""}>
                <Alert color="danger">
                    <Font.P>
                        Are you sure you want to delete this transaction?
                    </Font.P>

                    <ButtonsContainer>
                        <Button color="danger" onClick={handleDelete}>
                            Yes, delete this transaction
                        </Button>

                        <Button
                            btnstyle="text"
                            onClick={() => setIsOpen(false)}
                        >
                            No, cancel
                        </Button>
                    </ButtonsContainer>
                </Alert>
            </Modal>
        </>
    )
}

export default DeleteTransaction
