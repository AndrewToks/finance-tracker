export const currencyFormatter = (amount) => {
   const formatter = Intl.NumberFormat("en-US",{
        currency:'NGN',
        style:'currency'
    })
    return formatter.format(amount)
}
