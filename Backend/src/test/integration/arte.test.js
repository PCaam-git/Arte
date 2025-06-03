const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);
chai.should();

describe('arte', () => {
    describe('GET /api/obras', () => {
        it('should get all obras', (done) => {
            chai.request(app)
                .get('/api/obras')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    if (response.body.length > 0) {
                        expect(response.body[0]).to.have.property('ID_obra');
                        expect(response.body[0]).to.have.property('descripcion');
                        expect(response.body[0]).to.have.property('precio');
                        expect(response.body[0]).to.have.property('ID_disciplina');
                        expect(response.body[0]).to.have.property('ID_subdisciplina');
                    }
                    done();
                });
        });
    });

    describe('GET /api/obras/:id', () => {
        it('should get obra by id', (done) => {
            chai.request(app)
                .get('/api/obras/5')
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.property('ID_obra');
                    expect(response.body).to.have.property('descripcion');
                    expect(response.body).to.have.property('precio');
                    expect(response.body.ID_obra).to.equal(5);
                    done();
                });
        });

        it('should return 404 for non-existent obra', (done) => {
            chai.request(app)
                .get('/api/obras/9999')
                .end((error, response) => {
                    response.should.have.status(404);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Obra no encontrada');
                    done();
                });
        });
    });

    describe('POST /api/obras', () => {
        it('should create a new obra', (done) => {
            chai.request(app)
                .post('/api/obras')
                .send({
                    ID_disciplina: 1,
                    ID_subdisciplina: 1,
                    descripcion: 'Nueva obra de test',
                    fecha_creacion: '2025-06-02',
                    precio: 250.50
                })
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('message');
                    expect(response.body.message).to.equal('Obra creada');
                    done();
                });
        });

        it('validation should fail because descripcion is mandatory', (done) => {
            chai.request(app)
                .post('/api/obras')
                .send({
                    ID_disciplina: 1,
                    ID_subdisciplina: 1,
                    fecha_creacion: '2025-06-02',
                    precio: 250.50
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Faltan campos obligatorios');
                    done();
                });
        });

        it('validation should fail because precio is mandatory', (done) => {
            chai.request(app)
                .post('/api/obras')
                .send({
                    ID_disciplina: 1,
                    ID_subdisciplina: 1,
                    descripcion: 'Nueva obra de test',
                    fecha_creacion: '2025-06-02'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Faltan campos obligatorios');
                    done();
                });
        });
    });

    describe('PUT /api/obras/:id', () => {
        it('should update an existing obra', (done) => {
            chai.request(app)
                .put('/api/obras/5')
                .send({
                    descripcion: 'Obra actualizada en test',
                    fecha_creacion: '2025-06-02',
                    precio: 300.75,
                    ID_disciplina: 2,
                    ID_subdisciplina: 4
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.property('message');
                    expect(response.body.message).to.equal('Obra actualizada correctamente');
                    expect(response.body).to.have.property('obra');
                    done();
                });
        });

        it('validation should fail because descripcion is mandatory', (done) => {
            chai.request(app)
                .put('/api/obras/5')
                .send({
                    fecha_creacion: '2025-06-02',
                    precio: 300.75,
                    ID_disciplina: 2,
                    ID_subdisciplina: 4
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('error');
                    expect(response.body.error).to.equal('Faltan campos obligatorios');
                    done();
                });
        });
    });

    describe('DELETE /api/obras/:id', () => {
        it('should delete an obra', (done) => {
            // Primero crear una obra para eliminar
            chai.request(app)
                .post('/api/obras')
                .send({
                    ID_disciplina: 1,
                    ID_subdisciplina: 1,
                    descripcion: 'Obra para eliminar',
                    fecha_creacion: '2025-06-02',
                    precio: 100
                })
                .end((error, createResponse) => {
                    // Luego eliminarla (usamos ID conocido para simplificar)
                    chai.request(app)
                        .delete('/api/obras/6')
                        .end((error, response) => {
                            response.should.have.status(200);
                            expect(response.body).to.have.property('message');
                            expect(response.body.message).to.equal('Obra eliminada');
                            done();
                        });
                });
        });
    });
});