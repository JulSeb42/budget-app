const getMonthCategories = (arr, selectedMonth) => {
    return arr
        .filter(transaction => transaction.dateShort === selectedMonth)
        .filter(transaction => transaction.type === "expense")
        .map(transaction => transaction.category)
}

export default getMonthCategories
