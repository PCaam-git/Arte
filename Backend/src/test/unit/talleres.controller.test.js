const expect = require('chai').expect;
const { getTalleres, getTaller, postTaller, putTaller, deleteTaller } = require('../../controller/talleres');
const talleresService = require('../../service/talleres');

jest.mock('../../service/talleres');

describe('talleres controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {}, file: null };
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        jest.clearAllMocks();
    });

    describe('getTalleres', () => {
        it('should return all talleres', async () => {
            const mockTalleres = [{ ID_taller: 1, tematica: 'Taller 1' }];
            talleresService.findAllTalleres.mockResolvedValue(mockTalleres);

            await getTalleres(req, res);

            expect(res.json.mock.calls[0][0]).to.deep.equal(mockTalleres);
        });

        it('should return 500 on error', async () => {
            talleresService.findAllTalleres.mockRejectedValue(new Error('Database error'));

            await getTalleres(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(500);
        });
    });

    describe('getTaller', () => {
        it('should return taller when found', async () => {
            const mockTaller = { ID_taller: 1, tematica: 'Taller 1' };
            req.params.ID_taller = '1';
            talleresService.findTaller.mockResolvedValue(mockTaller);

            await getTaller(req, res);

            expect(res.json.mock.calls[0][0]).to.deep.equal(mockTaller);
        });

        it('should return 404 when not found', async () => {
            req.params.ID_taller = '999';
            talleresService.findTaller.mockResolvedValue(null);

            await getTaller(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(404);
        });
    });

    describe('postTaller', () => {
        it('should create taller', async () => {
            req.body = { tematica: 'Nuevo taller', fecha: '2025-05-01', lugar: 'Sala A', descripcion: 'Descripción' };
            talleresService.registerTaller.mockResolvedValue();

            await postTaller(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(201);
        });

        it('should return 400 when missing fields', async () => {
            req.body = { tematica: 'Nuevo taller' };

            await postTaller(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(400);
        });
    });

    describe('putTaller', () => {
        it('should update taller', async () => {
            const mockResult = { ID_taller: 1, tematica: 'Actualizado' };
            req.params.ID_taller = '1';
            req.body = { tematica: 'Actualizado', fecha: '2025-05-01', lugar: 'Sala B', descripcion: 'Nueva descripción' };
            talleresService.modifyTaller.mockResolvedValue(mockResult);

            await putTaller(req, res);

            expect(res.json.mock.calls).to.have.lengthOf(1);
        });

        it('should return 400 when missing fields', async () => {
            req.params.ID_taller = '1';
            req.body = { tematica: 'Actualizado' };

            await putTaller(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(400);
        });
    });

    describe('deleteTaller', () => {
        it('should delete taller', async () => {
            req.params.ID_taller = '1';
            talleresService.removeTaller.mockResolvedValue();

            await deleteTaller(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(200);
        });
    });
});