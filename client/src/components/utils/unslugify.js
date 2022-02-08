import { capitalize } from "components-react-julseb"

const unslugify = str => {
    return capitalize(str.replace("-", " "))
}

export default unslugify