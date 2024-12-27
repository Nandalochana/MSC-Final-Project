const RoleController = require('../controllers/roleController');
const LoginInfoController = require('../controllers/loginInfoController');
const PaymentTypeController = require('../controllers/paymentTypeController');
const UserPaymentTypeController = require('../controllers/userPaymentTypeController');
const { UserController, upload } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');

function setRoutes(app) {
    const roleController = new RoleController();
    app.get('/roles', authenticateJWT, roleController.getRoles.bind(roleController));
    app.get('/roles/:id', authenticateJWT, roleController.getRoleById.bind(roleController));
    app.post('/roles', authenticateJWT, roleController.createRole.bind(roleController));
    app.put('/roles/:id', authenticateJWT, roleController.updateRole.bind(roleController));
    app.delete('/roles/:id', authenticateJWT, roleController.deleteRole.bind(roleController));

    const loginInfoController = new LoginInfoController();
    app.get('/loginInfo', authenticateJWT, loginInfoController.getloginInfo.bind(loginInfoController));
    app.get('/loginInfo/:id', authenticateJWT, loginInfoController.getLoginInfoById.bind(loginInfoController));
    app.post('/loginInfo', authenticateJWT, loginInfoController.createLoginInfo.bind(loginInfoController));
    app.put('/loginInfo/:id', authenticateJWT, loginInfoController.updateLoginInfo.bind(loginInfoController));
    app.delete('/loginInfo/:id', authenticateJWT, loginInfoController.deleteLoginInfo.bind(loginInfoController));

    const paymentTypeController = new PaymentTypeController();
    app.get('/paymentTypes', authenticateJWT, paymentTypeController.getPaymentTypes.bind(paymentTypeController));
    app.get('/paymentTypes/:id', authenticateJWT, paymentTypeController.getPaymentTypeById.bind(paymentTypeController));
    app.post('/paymentTypes', authenticateJWT, paymentTypeController.createPaymentType.bind(paymentTypeController));
    app.put('/paymentTypes/:id', authenticateJWT, paymentTypeController.updatePaymentType.bind(paymentTypeController));
    app.delete('/paymentTypes/:id', authenticateJWT, paymentTypeController.deletePaymentType.bind(paymentTypeController));

    const userPaymentTypeController = new UserPaymentTypeController();
    app.get('/userPaymentTypes', authenticateJWT, userPaymentTypeController.getUserPaymentTypes.bind(userPaymentTypeController));
    app.get('/userPaymentTypes/:id', authenticateJWT, userPaymentTypeController.getUserPaymentTypeById.bind(userPaymentTypeController));
    app.post('/userPaymentTypes', authenticateJWT, userPaymentTypeController.createUserPaymentType.bind(userPaymentTypeController));
    app.put('/userPaymentTypes/:id', authenticateJWT, userPaymentTypeController.updateUserPaymentType.bind(userPaymentTypeController));
    app.delete('/userPaymentTypes/:id', authenticateJWT, userPaymentTypeController.deleteUserPaymentType.bind(userPaymentTypeController));

    const userController = new UserController();
    app.get('/users', authenticateJWT, userController.getUsers.bind(userController));
    app.get('/users/:id', authenticateJWT, userController.getUserById.bind(userController));
    app.post('/users', authenticateJWT, upload.single('profileImg'), userController.createUser.bind(userController));
    app.put('/users/:id', authenticateJWT, upload.single('profileImg'), userController.updateUser.bind(userController));
    app.delete('/users/:id', authenticateJWT, userController.deleteUser.bind(userController));

    // Public routes
    app.post('/login', loginInfoController.login.bind(loginInfoController));
}

module.exports = setRoutes;