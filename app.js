'use strict';
const { Gateway } = require('./gateway');
const gateway = new Gateway();

function process(params) {
    const cardNumber = params.cardNumber;
    const cardOwner = params.cardOwner;
    const cardExpiration = params.cardExpiration;
    const cardCvc = params.cardCvc;

    validate(cardNumber, cardOwner, cardExpiration, cardCvc);

    // call payment gateway
    return gateway.process(cardNumber, cardOwner, cardExpiration, cardCvc);
}

function validate(cardNumber, cardOwner, cardExpiration, cardCvc) {
    const cardNumberRegExp = new RegExp('^[0-9]{4}( )?[0-9]{4}( )?[0-9]{4}( )?[0-9]{4}$');

    if (!cardNumber || !cardNumberRegExp.test(cardNumber)) {
        throw new Error(`Invalid Card Number. It should follow the pattern: 1111222233334444 or 1111 2222 3333 4444.`);
    }

    const cardOwnerRegExp = new RegExp('^[a-zA-Z ]+$');
    cardOwner = cardOwner.trim();
    if (!cardOwner || !cardOwnerRegExp.test(cardOwner)) {
        throw new Error(`Invalid Card Owner name. It should only have letters.`);
    }

    const cardExpirationRegExp = new RegExp('^(0[1-9]|1[0-2])\\/(20[1-9]{2})$');
    cardExpiration = cardExpiration.trim();
    if (!cardExpiration || !cardExpirationRegExp.test(cardExpiration)) {
        throw new Error(`Invalid card expiration. It should follow the pattern: MM/YYYY.`);
    }

    const cardCvcRegExp = new RegExp('^[1-9]{3}$');
    cardCvc = cardCvc.trim();
    if (!cardCvc || !cardCvcRegExp.test(cardCvc)) {
        throw new Error(`Invalid CVC number. It should follow the pattern: 111.`);
    }

    return true;
}

module.exports = {
    process,
    validate
}
