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
const authenticateJWT = require('../middleware/authMiddleware');
const EmployeeHistoryController = require('../controllers/employeehistoryController');
const { analyzeRatings } = require('../controllers/analysisController');
const SearchController = require('../controllers/SearchController');
const FreelancerTimeSlotController = require('../controllers/freelancerTimeSlotController');
const EmployerHistoryController = require('../controllers/employerHistoryController');
const BookingSlotsController = require('../controllers/bookingSlotsController');
const TaskOfferedController = require('../controllers/taskOfferedController');
const RatingController = require('../controllers/ratingController');

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
    app.post('/loginInfo/updateRole', authenticateJWT, loginInfoController.updateRole.bind(loginInfoController)); // New route for updating role
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
    app.get('/users/withLoginInfo', authenticateJWT, userController.getUsersWithLoginInfo.bind(userController));
    app.get('/users/:id', authenticateJWT, userController.getUserById.bind(userController));
    app.post('/users', authenticateJWT, userUpload.single('profileImg'), userController.createUser.bind(userController));
    app.put('/users/:id', authenticateJWT, userUpload.single('profileImg'), userController.updateUser.bind(userController));
    app.put('/users/toggleStatus/:id', authenticateJWT, userController.toggleUserStatus.bind(userController));
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
    app.get('/userProfiles/user/:userId', authenticateJWT, userProfileController.getUserProfileByUserId.bind(userProfileController));
    app.post('/userProfiles', authenticateJWT, userProfileController.createUserProfile.bind(userProfileController));
    app.put('/userProfiles/:id', authenticateJWT, userProfileController.updateUserProfile.bind(userProfileController));
    app.delete('/userProfiles/:id', authenticateJWT, userProfileController.deleteUserProfile.bind(userProfileController));

    const taskController = new TaskController();
    app.get('/tasks', authenticateJWT, taskController.getTasks.bind(taskController));
    app.get('/tasks/userId', authenticateJWT, taskController.getTaskByUserId.bind(taskController));
    app.get('/tasks/:id', authenticateJWT, taskController.getTaskById.bind(taskController));
    app.post('/tasks', authenticateJWT, taskController.createTask.bind(taskController));
    app.put('/tasks/:id', authenticateJWT, taskController.updateTask.bind(taskController));
    app.put('/tasks/toggleStatus/:id', authenticateJWT, taskController.toggleTaskStatus.bind(taskController));
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
    app.get('/comments/task/:taskId', authenticateJWT, commentController.getCommentsByTaskId.bind(commentController)); // New route
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

    const searchController = new SearchController();
    app.get('/search/loadAllFreelancersByFilter', authenticateJWT, searchController.loadAllFreelancersByFilter.bind(searchController));
    app.get('/search/users', authenticateJWT, searchController.searchUserByName.bind(searchController));

    const freelancerTimeSlotController = new FreelancerTimeSlotController();
    app.get('/freelancerTimeSlots', authenticateJWT, freelancerTimeSlotController.getFreelancerTimeSlots.bind(freelancerTimeSlotController));
    app.get('/freelancerTimeSlots/:id', authenticateJWT, freelancerTimeSlotController.getFreelancerTimeSlotById.bind(freelancerTimeSlotController));
    app.get('/freelancerTimeSlots/freelancer/:id', authenticateJWT, freelancerTimeSlotController.getTimeSlotsByFreelancerId.bind(freelancerTimeSlotController)); // New route
    app.post('/freelancerTimeSlots', authenticateJWT, freelancerTimeSlotController.createFreelancerTimeSlot.bind(freelancerTimeSlotController));
    app.put('/freelancerTimeSlots/:id', authenticateJWT, freelancerTimeSlotController.updateFreelancerTimeSlot.bind(freelancerTimeSlotController));
    app.delete('/freelancerTimeSlots/:id', authenticateJWT, freelancerTimeSlotController.deleteFreelancerTimeSlot.bind(freelancerTimeSlotController));
    app.get('/freelancerTimeSlots/slot/search', authenticateJWT, freelancerTimeSlotController.searchFreelancerTimeSlots.bind(freelancerTimeSlotController));

    const bookingSlotsController = new BookingSlotsController();
    app.post('/bookingSlots', authenticateJWT, bookingSlotsController.createBookingSlot.bind(bookingSlotsController));
    app.put('/bookingSlots/:id', authenticateJWT, bookingSlotsController.updateBookingSlot.bind(bookingSlotsController));
    app.delete('/bookingSlots/:id', authenticateJWT, bookingSlotsController.deleteBookingSlot.bind(bookingSlotsController));
    app.get('/bookingSlots/user/:userId', authenticateJWT, bookingSlotsController.getBookingSlotsByUserId.bind(bookingSlotsController));
    app.post('/bookingSlots/user/past', authenticateJWT, bookingSlotsController.getBookingSlotsByUserIdPast.bind(bookingSlotsController)); // Updated route
    app.post('/bookingSlots/user/future', authenticateJWT, bookingSlotsController.getBookingSlotsByUserIdFuture.bind(bookingSlotsController)); // Updated route
    app.get('/bookingSlots/buyer/:buyerId', authenticateJWT, bookingSlotsController.getBookingSlotsByBuyerId.bind(bookingSlotsController));
    app.post('/bookingSlots/buyer/past', authenticateJWT, bookingSlotsController.getBookingSlotsByBuyerIdPast.bind(bookingSlotsController)); // Updated route
    app.post('/bookingSlots/buyer/future', authenticateJWT, bookingSlotsController.getBookingSlotsByBuyerIdFuture.bind(bookingSlotsController)); // Updated route
    app.get('/bookingSlots', authenticateJWT, bookingSlotsController.getAllBookingSlots.bind(bookingSlotsController));
    app.put('/bookingSlots/:id/buyerStatus', authenticateJWT, bookingSlotsController.updateBuyerStatus.bind(bookingSlotsController));
    app.put('/bookingSlots/:id/freelancerStatus', authenticateJWT, bookingSlotsController.updateFreelancerStatus.bind(bookingSlotsController));

    const taskOfferedController = new TaskOfferedController();
    app.post('/taskOffereds', authenticateJWT, taskOfferedController.createTaskOffered.bind(taskOfferedController));
    app.put('/taskOffereds/:id', authenticateJWT, taskOfferedController.updateTaskOffered.bind(taskOfferedController));
    app.put('/taskOffereds/:id/freelancerStatus', authenticateJWT, taskOfferedController.updateTaskOfferedStatusAsFreelnacer.bind(taskOfferedController)); // New route
    app.put('/taskOffereds/:id/buyerStatus', authenticateJWT, taskOfferedController.updateTaskOfferedStatusAsBuyer.bind(taskOfferedController)); // New route
    app.delete('/taskOffereds/:id', authenticateJWT, taskOfferedController.deleteTaskOffered.bind(taskOfferedController));
    app.get('/taskOffereds', authenticateJWT, taskOfferedController.searchTaskOffered.bind(taskOfferedController));
    app.get('/taskOffereds/offerUser/:offerUserId', authenticateJWT, taskOfferedController.getTasksByOfferUserId.bind(taskOfferedController));
    app.get('/taskOffereds/createdUser/:createdUserId', authenticateJWT, taskOfferedController.getTasksByCreatedUserId.bind(taskOfferedController));

    const ratingController = new RatingController();
    app.post('/ratings', authenticateJWT, ratingController.createRating.bind(ratingController));
    app.put('/ratings/:id', authenticateJWT, ratingController.updateRating.bind(ratingController));
    app.delete('/ratings/:id', authenticateJWT, ratingController.deleteRating.bind(ratingController));
    app.get('/ratings/:id', authenticateJWT, ratingController.getRatingById.bind(ratingController));
    app.get('/ratings/buyer/:buyerId', authenticateJWT, ratingController.getRatingsByBuyerId.bind(ratingController));
    app.get('/ratings/freelancer/:freelancerId', authenticateJWT, ratingController.getRatingsByFreelancerId.bind(ratingController));
    app.get('/ratings', authenticateJWT, ratingController.getAllRatings.bind(ratingController));

    // Auth routes
    app.post('/login', loginInfoController.login.bind(loginInfoController));
    app.post('/logout', authenticateJWT, loginInfoController.logout.bind(loginInfoController));
    app.post('/signup', loginInfoController.signup);

    app.post('/analyse', authenticateJWT, analyzeRatings);
}

module.exports = setRoutes;