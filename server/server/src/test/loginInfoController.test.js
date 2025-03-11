const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const LoginInfoController = require('../controllers/loginInfoController');
const LoginInfo = require('../models/loginInfo');
const User = require('../models/user');
const Role = require('../models/role');

jest.mock('../models/loginInfo', () => {
    const mockPopulate = jest.fn().mockReturnThis();
    return {
        find: jest.fn().mockReturnValue({ populate: mockPopulate }),
        findById: jest.fn().mockReturnValue({ populate: mockPopulate }),
        findByIdAndUpdate: jest.fn().mockReturnValue({ populate: mockPopulate }),
        findByIdAndDelete: jest.fn().mockReturnValue({ populate: mockPopulate }),
        findOne: jest.fn().mockReturnValue({ populate: mockPopulate }),
        prototype: {
            save: jest.fn()
        }
    };
});

jest.mock('../models/user', () => ({
    findById: jest.fn(),
    prototype: {
        save: jest.fn()
    }
}));

jest.mock('../models/role', () => ({
    findOne: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}));

describe('LoginInfoController', () => {
    let req, res, loginInfoController;

    beforeEach(() => {
        loginInfoController = new LoginInfoController();
        req = { params: {}, body: {}, query: {}, header: jest.fn() };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn()
        };
    });

    test('deleteLoginInfo should delete existing login info', async () => {
        req.params.id = '1';
        LoginInfo.findByIdAndDelete.mockResolvedValue({});

        await loginInfoController.deleteLoginInfo(req, res);

        expect(LoginInfo.findByIdAndDelete).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'LoginInfo deleted' });
    });


    test('deleteLoginInfo should return 404 if login info not found', async () => {
        req.params.id = '1';
        LoginInfo.findByIdAndDelete.mockResolvedValue(null);

        await loginInfoController.deleteLoginInfo(req, res);

        expect(LoginInfo.findByIdAndDelete).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'LoginInfo not found' });
    });

    test('logout should clear the token', async () => {
        req.header.mockReturnValue('Bearer token');

        await loginInfoController.logout(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Authorization', '');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Logged out successfully' });
    });


});
