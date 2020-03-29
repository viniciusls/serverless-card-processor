// Libs
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require('sinon');
const { Gateway } = require('../gateway');

describe('Tests for validate card number on validate()', () => {
    const app = require('../app');
    const cardOwner = 'Vinicius Silva';
    const cardExpiration = '05/2028';
    const cardCvc = '123';

    let gatewayProcess;

    beforeEach(() => {
        gatewayProcess = sinon.stub(Gateway.prototype, 'process');
    });

    it('should pass without spaces between the 4 groups of 4 numbers', async () => {
        const cardNumber = '1234567890123456';

        chai.expect(app.process(cardNumber, cardOwner, cardExpiration, cardCvc)).to.be.true;

        console.log(gatewayProcess);
        chai.expect(gatewayProcess.calledOnce).to.be.true;
    });

    it('should pass with spaces between the 4 groups of 4 numbers', async () => {
        const cardNumber = '1234 5678 9012 3456';

        chai.expect(app.validate(cardNumber, cardOwner, cardExpiration, cardCvc)).to.be.true;
    });

    it('should not pass if cardNumber has a letter on the beginning and no spaces between the 4 groups of 4 characters', async () => {
        const cardNumber = 'A234567890123456';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid Card Number. It should follow the pattern: 1111222233334444 or 1111 2222 3333 4444.');
    });

    it('should not pass if cardNumber has a letter on the end and no spaces between the 4 groups of 4 characters', async () => {
        const cardNumber = '123456789012345B';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid Card Number. It should follow the pattern: 1111222233334444 or 1111 2222 3333 4444.');
    });

    it('should not pass if cardNumber has a letter on any part and no spaces between the 4 groups of 4 characters', async () => {
        const cardNumber = 'A234567C90123456';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid Card Number. It should follow the pattern: 1111222233334444 or 1111 2222 3333 4444.');
    });

    it('should not pass if cardNumber has a letter on the beginning and spaces between the 4 groups of 4 characters', async () => {
        const cardNumber = 'A234 5678 9012 3456';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid Card Number. It should follow the pattern: 1111222233334444 or 1111 2222 3333 4444.');
    });

    it('should not pass if cardNumber has a letter on the end and spaces between the 4 groups of 4 characters', async () => {
        const cardNumber = '1234 5678 9012 345B';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid Card Number. It should follow the pattern: 1111222233334444 or 1111 2222 3333 4444.');
    });

    it('should not pass if cardNumber has a letter on any part and spaces between the 4 groups of 4 characters', async () => {
        const cardNumber = 'A234 567C 9012 3456';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid Card Number. It should follow the pattern: 1111222233334444 or 1111 2222 3333 4444.');
    });

    afterEach(() => {
        gatewayProcess.restore();
    });
});
