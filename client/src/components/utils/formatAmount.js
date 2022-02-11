// Packages
import { useContext } from "react"
import { AuthContext } from "../../context/auth"

function FormatAmount(num) {
    const { user } = useContext(AuthContext)

    const formatter = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: user.currency || "EUR",
    })

    return formatter.format(num)
}

export default FormatAmount
