// Libs
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('Tests for validate card owner on validate()', () => {
    const app = require('../app');
    const cardNumber = '1234567890123456';
    const cardExpiration = '05/2028';
    const cardCvc = '123';

    it('should pass', async () => {
        const cardOwner = 'Vinicius Silva';

        chai.expect(app.validate(cardNumber, cardOwner, cardExpiration, cardCvc)).to.be.true;
    });

    it('should not pass if cardOwner has a letter on the beginnings', async () => {
        const cardOwner = '1Vinicius Silva';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid Card Owner name. It should only have letters.');
    });

    it('should not pass if cardOwner has a letter on the end', async () => {
        const cardOwner = 'Vinicius Silva1';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid Card Owner name. It should only have letters.');
    });

    it('should not pass if cardOwner has a letter on any part', async () => {
        const cardOwner = 'Vinicius1 Silva';

        chai.expect(app.validate.bind(app, cardNumber, cardOwner, cardExpiration, cardCvc)).to.throw('Invalid Card Owner name. It should only have letters.');
    });
});
