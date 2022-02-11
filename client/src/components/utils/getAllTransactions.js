const getAllTransactions = (arr, category) => {
    return arr
        .filter(transaction => transaction.category === category)
        .map(transaction => transaction.amount)
}

export default getAllTransactions
