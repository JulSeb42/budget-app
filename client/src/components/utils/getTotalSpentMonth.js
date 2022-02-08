const getTotalSpentMonth = (arr, selectedMonth) => {
    return arr
        .filter(transaction => transaction.dateShort === selectedMonth)
        .filter(transaction => transaction.type === "expense")
        .map(transaction => transaction.amount)
        .reduce((partialSum, a) => partialSum + a, 0)

    // return formatAmount(value, populatedUser.currency)
}

export default getTotalSpentMonth