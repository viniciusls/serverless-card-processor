// Libs
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('Tests for validate card owner on validate()', () => {
    const app = require('../app');
    const cardNumber = '1234567890123456';
    const cardOwner = 'Vinicius Silva';
    const cardCvc = '123';


    it('should pass', async () => {
        const cardExpiration = '05/2028';

        chai.expect(app.validate(cardNumber, cardOwner, cardExpiration, cardCvc)).to.be.true;
    });

    it('should not pass if cardExpiration has no complete month', async () => {
        const cardExpiration = '5/2028';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid card expiration. It should follow the pattern: MM/YYYY.');
    });

    it('should not pass if cardExpiration month is less than 01', async () => {
        const cardExpiration = '00/2028';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid card expiration. It should follow the pattern: MM/YYYY.');
    });

    it('should not pass if cardExpiration month is greater then 12', async () => {
        const cardExpiration = '13/2028';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid card expiration. It should follow the pattern: MM/YYYY.');
    });

    it('should not pass if cardExpiration has no complete year', async () => {
        const cardExpiration = '05/28';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid card expiration. It should follow the pattern: MM/YYYY.');
    });

    it('should not pass if cardExpiration has no / between month and year', async () => {
        const cardExpiration = '052028';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid card expiration. It should follow the pattern: MM/YYYY.');
    });

    it('should not pass if cardExpiration has a letter on the beginning', async () => {
        const cardExpiration = '05/2028A';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid card expiration. It should follow the pattern: MM/YYYY.');
    });

    it('should not pass if cardExpiration has a letter on the end', async () => {
        const cardExpiration = 'B05/2028';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid card expiration. It should follow the pattern: MM/YYYY.');
    });

    it('should not pass if cardExpiration has a letter on any part', async () => {
        const cardExpiration = '05/20C8';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid card expiration. It should follow the pattern: MM/YYYY.');
    });
});
