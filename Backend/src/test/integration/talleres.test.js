const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('talleres', () => {
    describe('GET /api/talleres', () => {
        it('should get all talleres', (done) => {
            chai.request(app)
                .get('/api/talleres')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    if (response.body.length > 0) {
                        expect(response.body[0]).to.have.property('ID_taller');
                        expect(response.body[0]).to.have.property('tematica');
                        expect(response.body[0]).to.have.property('fecha');
                        expect(response.body[0]).to.have.property('lugar');
                        expect(response.body[0]).to.have.property('descripcion');
                    }
                    done();
                });
        });
    });

    describe('GET /api/talleres/:id', () => {
        it('should get taller by id', (done) => {
            chai.request(app)
                .get('/api/talleres/1')
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.property('ID_taller');
                    expect(response.body).to.have.property('tematica');
                    expect(response.body).to.have.property('fecha');
                    expect(response.body.ID_taller).to.equal(1);
                    done();
                });
        });

        it('should return 404 for non-existent taller', (done) => {
            chai.request(app)
                .get('/api/talleres/9999')
                .end((error, response) => {
                    response.should.have.status(404);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Taller no encontrado');
                    done();
                });
        });
    });

    describe('POST /api/talleres', () => {
        it('should create a new taller', (done) => {
            chai.request(app)
                .post('/api/talleres')
                .send({
                    tematica: 'Taller de test',
                    fecha: '2025-07-15',
                    lugar: 'Sala de test',
                    descripcion: 'Descripción del taller de test'
                })
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('message');
                    expect(response.body.message).to.equal('Taller creado');
                    done();
                });
        });

        it('validation should fail because tematica is mandatory', (done) => {
            chai.request(app)
                .post('/api/talleres')
                .send({
                    fecha: '2025-07-15',
                    lugar: 'Sala de test',
                    descripcion: 'Descripción del taller de test'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Faltan campos obligatorios');
                    done();
                });
        });

        it('validation should fail because fecha is mandatory', (done) => {
            chai.request(app)
                .post('/api/talleres')
                .send({
                    tematica: 'Taller de test',
                    lugar: 'Sala de test',
                    descripcion: 'Descripción del taller de test'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Faltan campos obligatorios');
                    done();
                });
        });

        it('validation should fail because lugar is mandatory', (done) => {
            chai.request(app)
                .post('/api/talleres')
                .send({
                    tematica: 'Taller de test',
                    fecha: '2025-07-15',
                    descripcion: 'Descripción del taller de test'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Faltan campos obligatorios');
                    done();
                });
        });
    });

    describe('PUT /api/talleres/:id', () => {
        it('should update an existing taller', (done) => {
            chai.request(app)
                .put('/api/talleres/1')
                .send({
                    tematica: 'Taller actualizado en test',
                    fecha: '2025-08-20',
                    lugar: 'Nueva sala de test',
                    descripcion: 'Nueva descripción actualizada'
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.property('message');
                    expect(response.body.message).to.equal('Taller actualizado correctamente');
                    expect(response.body).to.have.property('Taller');
                    done();
                });
        });

        it('validation should fail because tematica is mandatory', (done) => {
            chai.request(app)
                .put('/api/talleres/1')
                .send({
                    fecha: '2025-08-20',
                    lugar: 'Nueva sala de test',
                    descripcion: 'Nueva descripción actualizada'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Faltan campos obligatorios');
                    done();
                });
        });
    });

    describe('DELETE /api/talleres/:id', () => {
        it('should delete a taller', (done) => {
            // Primero crear un taller para eliminar
            chai.request(app)
                .post('/api/talleres')
                .send({
                    tematica: 'Taller para eliminar',
                    fecha: '2025-09-01',
                    lugar: 'Sala temporal',
                    descripcion: 'Taller que será eliminado'
                })
                .end((error, createResponse) => {
                    // Luego eliminarlo (usamos ID conocido para simplificar)
                    chai.request(app)
                        .delete('/api/talleres/2')
                        .end((error, response) => {
                            response.should.have.status(200);
                            expect(response.body).to.have.property('message');
                            expect(response.body.message).to.equal('Taller eliminado');
                            done();
                        });
                });
        });
    });
});