// Libs
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('Tests for validate card owner on validate()', () => {
    const app = require('../app');
    const cardNumber = '1234567890123456';
    const cardExpiration = '05/2028';
    const cardOwner = 'Vinicius Silva';
   

    it('should pass', async () => {
        const cardCvc = '123';

        chai.expect(app.validate(cardNumber, cardOwner, cardExpiration, cardCvc)).to.be.true;
    });

    it('should not pass if cardCvc has a letter on the beginning', async () => {
        const cardCvc = 'A23';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid CVC number. It should follow the pattern: 111.');
    });

    it('should not pass if cardCvc has a letter on the end', async () => {
        const cardCvc = '12B';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid CVC number. It should follow the pattern: 111.');
    });

    it('should not pass if cardCvc has a letter on any part', async () => {
        const cardCvc = '1C3';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid CVC number. It should follow the pattern: 111.');
    });
});
