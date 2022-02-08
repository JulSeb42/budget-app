const convertToDateShort = date => {
    const arr = date.split("-")

    return `${arr[0]}-${arr[1]}`
}

export default convertToDateShort
