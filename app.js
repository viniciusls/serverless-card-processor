'use strict';
const { Gateway } = require('./gateway');
const gateway = new Gateway();

async function process(params) {
    const cardNumber = params.cardnumber;
    const cardOwner = params.cardowner;
    const cardExpiration = params.cardexpiration;
    const cardCvc = params.cardcvc;

    await validate(cardNumber, cardOwner, cardExpiration, cardCvc);

    // call payment gateway
    return await gateway.process(cardNumber, cardOwner, cardExpiration, cardCvc);
}

async function validate(cardNumber, cardOwner, cardExpiration, cardCvc) {
    const cardNumberRegExp = new RegExp('[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}');

    if (!cardNumber || !cardNumberRegExp.test(cardNumber)) {
        throw `Invalid Card Number.`;
    }

    const cardOwnerRegExp = new RegExp('^[a-zA-Z ]+$');

    if (!cardOwner || !cardOwnerRegExp.test(cardOwner)) {
        throw `Invalid Card Owner name.`;
    }

    const cardExpirationRegExp = new RegExp('^(0[1-9]|1[0-2])\\/(20[1-9]{2})$');

    if (!cardExpiration || !cardExpirationRegExp.test(cardExpiration)) {
        throw `Invalid card expiration.`;
    }

    const cardCvcRegExp = new RegExp('^[1-9]{3}$');

    if (!cardCvc || !cardCvcRegExp.test(cardCvc)) {
        throw `Invalid CVC number`;
    }

    return true;
}

module.exports.process = process;
