const getTotalSpentCategory = (arr, selectedMonth, selectedCategory) => {
    return arr
        .filter(transaction => transaction.dateShort === selectedMonth)
        .filter(transaction => transaction.type === "expense")
        .filter(transaction => transaction.category === selectedCategory)
        .map(transaction => transaction.amount)
        .reduce((partialSum, a) => partialSum + a, 0)
}

export default getTotalSpentCategory
