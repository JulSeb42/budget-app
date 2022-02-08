const convertMonth = date => {
    const convertedDate = date.split("-")
    const month = convertedDate[1]
    const year = convertedDate[0]

    let convertedMonth =
        month === "01"
            ? "January"
            : month === "02"
            ? "February"
            : month === "03"
            ? "March"
            : month === "04"
            ? "April"
            : month === "05"
            ? "May"
            : month === "06"
            ? "June"
            : month === "07"
            ? "July"
            : month === "08"
            ? "August"
            : month === "09"
            ? "September"
            : month === "10"
            ? "October"
            : month === "11"
            ? "November"
            : month === "12"
            ? "December"
            : "Error in date"

    return `${convertedMonth} ${year}`
}

export default convertMonth