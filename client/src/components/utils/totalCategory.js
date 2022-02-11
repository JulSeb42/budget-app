const totalCategory = (arr, category) => {
    return arr
        .filter(transaction => transaction.category === category)
        .map(transaction => transaction.amount)
        .reduce((partialSum, a) => partialSum + a, 0)
}

export default totalCategory
