class Gateway {
    process(cardNumber, cardOwner, cardExpiration, cardCvc) {
        return { transactionId: Math.floor(Math.random() * 1000) };
    }
}

module.exports = { Gateway };
