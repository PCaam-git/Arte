const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('auth', () => {
    describe('POST /api/login', () => {
        it('should login with valid credentials', (done) => {
            chai.request(app)
                .post('/api/login')
                .send({
                    usuario: 'admin',
                    contraseña: 'admin123'
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.property('token');
                    done();
                });
        });

        it('should fail login with invalid username', (done) => {
            chai.request(app)
                .post('/api/login')
                .send({
                    usuario: 'wronguser',
                    contraseña: 'admin123'
                })
                .end((error, response) => {
                    response.should.have.status(401);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Credenciales incorrectas');
                    done();
                });
        });
    });
});