const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

describe('router testing', () => {
	it('it should POST room', (done) => {
		let params = { code: 'test' };
		chai.request(app).post('/room').end((err, res) => {
			let status = res.statusCode;
			let body = res.body;
			let expected = {
				result: 'success'
			};
			expect(status).to.equal(200);
			expect(expected).to.deep.equal(body);
			done();
		});
	});
});
