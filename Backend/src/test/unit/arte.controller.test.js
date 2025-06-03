const expect = require('chai').expect;
const { getObras, getObra, postObra, putObra, deleteObra } = require('../../controller/arte');
const arteService = require('../../service/arte');

jest.mock('../../service/arte');

describe('arte controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {}, file: null };
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        jest.clearAllMocks();
    });

    describe('getObras', () => {
        it('should return all obras', async () => {
            const mockObras = [{ ID_obra: 1, descripcion: 'Obra 1' }];
            arteService.findAllObras.mockResolvedValue(mockObras);

            await getObras(req, res);

            expect(res.json.mock.calls[0][0]).to.deep.equal(mockObras);
        });

        it('should return 500 on error', async () => {
            arteService.findAllObras.mockRejectedValue(new Error('Database error'));

            await getObras(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(500);
        });
    });

    describe('getObra', () => {
        it('should return obra when found', async () => {
            const mockObra = { ID_obra: 1, descripcion: 'Obra 1' };
            req.params.ID_obra = '1';
            arteService.findObra.mockResolvedValue(mockObra);

            await getObra(req, res);

            expect(res.json.mock.calls[0][0]).to.deep.equal(mockObra);
        });

        it('should return 404 when not found', async () => {
            req.params.ID_obra = '999';
            arteService.findObra.mockResolvedValue(null);

            await getObra(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(404);
        });
    });

    describe('postObra', () => {
        it('should create obra', async () => {
            req.body = { ID_disciplina: 1, ID_subdisciplina: 2, descripcion: 'Nueva obra', fecha_creacion: '2025-01-01', precio: 150 };
            arteService.registerObra.mockResolvedValue();

            await postObra(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(201);
        });

        it('should return 400 when missing fields', async () => {
            req.body = { descripcion: 'Nueva obra' };

            await postObra(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(400);
        });
    });

    describe('putObra', () => {
        it('should update obra', async () => {
            const mockResult = { ID_obra: 1, descripcion: 'Actualizada' };
            req.params.ID_obra = '1';
            req.body = { descripcion: 'Actualizada', fecha_creacion: '2025-01-01', precio: 200, ID_disciplina: 1, ID_subdisciplina: 2 };
            arteService.modifyObra.mockResolvedValue(mockResult);

            await putObra(req, res);

            expect(res.json.mock.calls).to.have.lengthOf(1);
        });

        it('should return 400 when missing fields', async () => {
            req.params.ID_obra = '1';
            req.body = { descripcion: 'Actualizada' };

            await putObra(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(400);
        });
    });

    describe('deleteObra', () => {
        it('should delete obra', async () => {
            req.params.ID_obra = '1';
            arteService.removeObra.mockResolvedValue();

            await deleteObra(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(200);
        });
    });
});