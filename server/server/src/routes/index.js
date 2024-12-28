const RoleController = require('../controllers/roleController');
const LoginInfoController = require('../controllers/loginInfoController');
const PaymentTypeController = require('../controllers/paymentTypeController');
const UserPaymentTypeController = require('../controllers/userPaymentTypeController');
const { UserController, upload } = require('../controllers/userController');
const ProfileController = require('../controllers/profileController');
const UserProfileController = require('../controllers/userProfileController');
const TaskController = require('../controllers/taskController');
const TaskProfileController = require('../controllers/taskProfileController');
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

    const profileController = new ProfileController();
    app.get('/profiles', authenticateJWT, profileController.getProfiles.bind(profileController));
    app.get('/profiles/:id', authenticateJWT, profileController.getProfileById.bind(profileController));
    app.post('/profiles', authenticateJWT, profileController.createProfile.bind(profileController));
    app.put('/profiles/:id', authenticateJWT, profileController.updateProfile.bind(profileController));
    app.delete('/profiles/:id', authenticateJWT, profileController.deleteProfile.bind(profileController));

    const userProfileController = new UserProfileController();
    app.get('/userProfiles', authenticateJWT, userProfileController.getUserProfiles.bind(userProfileController));
    app.get('/userProfiles/:id', authenticateJWT, userProfileController.getUserProfileById.bind(userProfileController));
    app.post('/userProfiles', authenticateJWT, userProfileController.createUserProfile.bind(userProfileController));
    app.put('/userProfiles/:id', authenticateJWT, userProfileController.updateUserProfile.bind(userProfileController));
    app.delete('/userProfiles/:id', authenticateJWT, userProfileController.deleteUserProfile.bind(userProfileController));

    const taskController = new TaskController();
    app.get('/tasks', authenticateJWT, taskController.getTasks.bind(taskController));
    app.get('/tasks/:id', authenticateJWT, taskController.getTaskById.bind(taskController));
    app.post('/tasks', authenticateJWT, taskController.createTask.bind(taskController));
    app.put('/tasks/:id', authenticateJWT, taskController.updateTask.bind(taskController));
    app.delete('/tasks/:id', authenticateJWT, taskController.deleteTask.bind(taskController));

    const taskProfileController = new TaskProfileController();
    app.get('/taskProfiles', authenticateJWT, taskProfileController.getTaskProfiles.bind(taskProfileController));
    app.get('/taskProfiles/:id', authenticateJWT, taskProfileController.getTaskProfileById.bind(taskProfileController));
    app.post('/taskProfiles', authenticateJWT, taskProfileController.createTaskProfile.bind(taskProfileController));
    app.put('/taskProfiles/:id', authenticateJWT, taskProfileController.updateTaskProfile.bind(taskProfileController));
    app.delete('/taskProfiles/:id', authenticateJWT, taskProfileController.deleteTaskProfile.bind(taskProfileController));
    app.get('/taskProfiles/task/:taskId', authenticateJWT, taskProfileController.getProfilesByTaskId.bind(taskProfileController));

    // Public routes
    app.post('/login', loginInfoController.login.bind(loginInfoController));
}

module.exports = setRoutes;