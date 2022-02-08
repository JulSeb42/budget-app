const getTotalEarnedMonth = (arr, selectedMonth) => {
    return arr
        .filter(transaction => transaction.dateShort === selectedMonth)
        .filter(transaction => transaction.type === "income")
        .map(transaction => transaction.amount)
        .reduce((partialSum, a) => partialSum + a, 0)
}

export default getTotalEarnedMonth
