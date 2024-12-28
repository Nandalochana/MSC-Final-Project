const RoleController = require('../controllers/roleController');
const LoginInfoController = require('../controllers/loginInfoController');
const PaymentTypeController = require('../controllers/paymentTypeController');
const UserPaymentTypeController = require('../controllers/userPaymentTypeController');
const { UserController, upload: userUpload } = require('../controllers/userController');
const ProfileController = require('../controllers/profileController');
const UserProfileController = require('../controllers/userProfileController');
const TaskController = require('../controllers/taskController');
const TaskProfileController = require('../controllers/taskProfileController');
const UserLocationInfoController = require('../controllers/userLocationInfoController');
const TaskLocationInfoController = require('../controllers/taskLocationInfoController');
const { AttachmentController, upload: attachmentUpload } = require('../controllers/attachmentController');
const CommentController = require('../controllers/commentController');
const EmployerHistoryController = require('../controllers/employerHistoryController');
const authenticateJWT = require('../middleware/authMiddleware');
const EmployeeHistoryController = require('../controllers/employeeHistoryController');

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
    app.post('/users', authenticateJWT, userUpload.single('profileImg'), userController.createUser.bind(userController));
    app.put('/users/:id', authenticateJWT, userUpload.single('profileImg'), userController.updateUser.bind(userController));
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

    const userLocationInfoController = new UserLocationInfoController();
    app.get('/userLocationInfo', authenticateJWT, userLocationInfoController.getUserLocationInfo.bind(userLocationInfoController));
    app.get('/userLocationInfo/:id', authenticateJWT, userLocationInfoController.getUserLocationInfoById.bind(userLocationInfoController));
    app.post('/userLocationInfo', authenticateJWT, userLocationInfoController.createUserLocationInfo.bind(userLocationInfoController));
    app.put('/userLocationInfo/:id', authenticateJWT, userLocationInfoController.updateUserLocationInfo.bind(userLocationInfoController));
    app.delete('/userLocationInfo/:id', authenticateJWT, userLocationInfoController.deleteUserLocationInfo.bind(userLocationInfoController));

    const taskLocationInfoController = new TaskLocationInfoController();
    app.get('/taskLocationInfo', authenticateJWT, taskLocationInfoController.getTaskLocationInfo.bind(taskLocationInfoController));
    app.get('/taskLocationInfo/:id', authenticateJWT, taskLocationInfoController.getTaskLocationInfoById.bind(taskLocationInfoController));
    app.post('/taskLocationInfo', authenticateJWT, taskLocationInfoController.createTaskLocationInfo.bind(taskLocationInfoController));
    app.put('/taskLocationInfo/:id', authenticateJWT, taskLocationInfoController.updateTaskLocationInfo.bind(taskLocationInfoController));
    app.delete('/taskLocationInfo/:id', authenticateJWT, taskLocationInfoController.deleteTaskLocationInfo.bind(taskLocationInfoController));

    const attachmentController = new AttachmentController();
    app.get('/attachments', authenticateJWT, attachmentController.getAttachments.bind(attachmentController));
    app.get('/attachments/:id', authenticateJWT, attachmentController.getAttachmentById.bind(attachmentController));
    app.post('/attachments', authenticateJWT, attachmentUpload.single('file'), attachmentController.createAttachment.bind(attachmentController));
    app.put('/attachments/:id', authenticateJWT, attachmentController.updateAttachment.bind(attachmentController));
    app.delete('/attachments/:id', authenticateJWT, attachmentController.deleteAttachment.bind(attachmentController));

    const commentController = new CommentController();
    app.get('/comments', authenticateJWT, commentController.getComments.bind(commentController));
    app.get('/comments/:id', authenticateJWT, commentController.getCommentById.bind(commentController));
    app.post('/comments', authenticateJWT, commentController.createComment.bind(commentController));
    app.put('/comments/:id', authenticateJWT, commentController.updateComment.bind(commentController));
    app.delete('/comments/:id', authenticateJWT, commentController.deleteComment.bind(commentController));

    const employerHistoryController = new EmployerHistoryController();
    app.get('/employerHistories', authenticateJWT, employerHistoryController.getEmployerHistories.bind(employerHistoryController));
    app.get('/employerHistories/:id', authenticateJWT, employerHistoryController.getEmployerHistoryById.bind(employerHistoryController));
    app.post('/employerHistories', authenticateJWT, employerHistoryController.createEmployerHistory.bind(employerHistoryController));
    app.put('/employerHistories/:id', authenticateJWT, employerHistoryController.updateEmployerHistory.bind(employerHistoryController));
    app.delete('/employerHistories/:id', authenticateJWT, employerHistoryController.deleteEmployerHistory.bind(employerHistoryController));

    const employeeHistoryController = new EmployeeHistoryController();
    app.get('/employeeHistories', authenticateJWT, employeeHistoryController.getEmployeeHistories.bind(employeeHistoryController));
    app.get('/employeeHistories/:id', authenticateJWT, employeeHistoryController.getEmployeeHistoryById.bind(employeeHistoryController));
    app.post('/employeeHistories', authenticateJWT, employeeHistoryController.createEmployeeHistory.bind(employeeHistoryController));
    app.put('/employeeHistories/:id', authenticateJWT, employeeHistoryController.updateEmployeeHistory.bind(employeeHistoryController));
    app.delete('/employeeHistories/:id', authenticateJWT, employeeHistoryController.deleteEmployeeHistory.bind(employeeHistoryController));

    // Auth routes
    app.post('/login', loginInfoController.login.bind(loginInfoController));
}

module.exports = setRoutes;