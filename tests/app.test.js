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
    let transactionId;

    beforeEach(() => {
        gatewayProcess = sinon.stub(Gateway.prototype, 'process');

        transactionId = Math.floor(Math.random() * 1000);
        gatewayProcess.returns({ transactionId });
    });

    it('should call gateway.process() if no exception is throw on validator', async () => {
        const cardNumber = '1234567890123456';

        const result = app.process({ cardNumber, cardOwner, cardExpiration, cardCvc });

        chai.expect(gatewayProcess.calledOnce).to.be.true;
        chai.expect(result).to.be.deep.equal({ transactionId });
    });

    it('should not call gateway.process() if an exception is throw by validator', async () => {
        const cardNumber = 'A234567890123456';

        chai.expect(app.process.bind(app, { cardNumber, cardOwner, cardExpiration, cardCvc })).to.throw('Invalid Card Number. It should follow the pattern: 1111222233334444 or 1111 2222 3333 4444.');
        chai.expect(gatewayProcess.called).to.be.false;
    });

    afterEach(() => {
        gatewayProcess.restore();
    });
});
