const getTotalSpentMonth = (arr, selectedMonth) => {
    return arr
        .filter(transaction => transaction.dateShort === selectedMonth)
        .filter(transaction => transaction.type === "expense")
        .map(transaction => transaction.amount)
        .reduce((partialSum, a) => partialSum + a, 0)
}

export default getTotalSpentMonth