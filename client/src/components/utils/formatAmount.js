const formatAmount = (num, currency) => {
    const formatter = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency,
    })

    return formatter.format(num)
}

export default formatAmount
