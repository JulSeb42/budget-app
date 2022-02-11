const getLengthTransactions = (arr, category) => {
    return arr
        .filter(item => item.category === category)
        .map(item => item.amount).length
}

export default getLengthTransactions
