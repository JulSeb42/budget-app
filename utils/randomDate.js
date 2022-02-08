const randomDate = () => {
    let day = Math.floor(Math.random() * (30 - 1)) + 1
    let month = Math.floor(Math.random() * (12 - 1)) + 1
    const years = [2022, 2021]
    
    const year = () => {
        const randomYear = Math.floor(Math.random() * years.length)
        return years[randomYear]
    }

    if (day < 10) {
        day = "0" + day
    }

    if (month < 10) {
        month = "0" + month
    }

    if (month === "02") {
        day = Math.floor(Math.random() * (28 - 1)) + 1
    }

    return `${year()}-${month}-${day}`
}

module.exports = randomDate
