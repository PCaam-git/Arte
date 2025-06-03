const expect = require('chai').expect;
const { login } = require('../../controller/auth');
const authService = require('../../service/auth');

jest.mock('../../service/auth');

describe('auth controller', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {} };
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should return token when valid', async () => {
            const mockToken = 'valid-token';
            req.body = { usuario: 'admin', contraseña: 'admin123' };
            authService.authenticateUser.mockResolvedValue(mockToken);

            await login(req, res);

            expect(res.json.mock.calls[0][0]).to.deep.equal({ token: mockToken });
        });

        it('should return 401 when invalid', async () => {
            req.body = { usuario: 'admin', contraseña: 'wrong' };
            authService.authenticateUser.mockRejectedValue(new Error('Credenciales incorrectas'));

            await login(req, res);

            expect(res.status.mock.calls[0][0]).to.equal(401);
        });
    });
});