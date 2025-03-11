/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Role management
 *   - name: Users
 *     description: User management
 *   - name: loginInfo
 *     description: Login information management
 *   - name: PaymentTypes
 *     description: Payment type management
 *   - name: UserPaymentTypes
 *     description: User payment type management
 *   - name: UserProfiles
 *     description: User profile management
 *   - name: Profiles
 *     description: Profile management
 *   - name: Tasks
 *     description: Task management
 *   - name: TaskProfiles
 *     description: Task profile management
 *   - name: UserLocationInfo
 *     description: User location information management
 *   - name: TaskLocationInfo
 *     description: Task location information management
 *   - name: Attachments
 *     description: Attachment management
 *   - name: Comments
 *     description: Comment management
 *   - name: EmployerHistories
 *     description: Employer history management
 *   - name: EmployeeHistories
 *     description: Employee history management
 *   - name: Authentication
 *     description: User authentication
 *   - name: Analyse
 *     description: Analyse location information
 *   - name: Search
 *     description: Search management
 *   - name: FreelancerTimeSlots
 *     description: Freelancer time slot management
 *   - name: BookingSlots
 *     description: API for managing booking slots 
 *   - name: TaskOffereds
 *     description: Task offered management
 *   - name: Ratings
 *     description: API for managing ratings
 */

/**
 * @swagger
 * /bookingSlots:
 *   post:
 *     summary: Create a new booking slot
 *     tags: [BookingSlots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - freelancerSlotId
 *               - userId
 *               - buyerId
 *               - startTime
 *               - endTime
 *               - hourlyRate
 *               - totalPrice
 *             properties:
 *               freelancerSlotId:
 *                 type: string
 *                 description: ID of the freelancer time slot
 *               userId:
 *                 type: string
 *                 description: ID of the user who created the booking slot
 *               buyerId:
 *                 type: string
 *                 description: ID of the buyer who booked the slot
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Start time of the booking slot
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: End time of the booking slot
 *               hourlyRate:
 *                 type: number
 *                 description: Hourly rate for the booking slot
 *               totalPrice:
 *                 type: number
 *                 description: Total price for the booking slot
 *     responses:
 *       201:
 *         description: Booking slot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /bookingSlots/{id}:
 *   put:
 *     summary: Update a booking slot
 *     tags: [BookingSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingSlot'
 *     responses:
 *       200:
 *         description: Booking slot updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Booking slot not found
 */

/**
 * @swagger
 * /bookingSlots/{id}:
 *   delete:
 *     summary: Delete a booking slot
 *     tags: [BookingSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking slot ID
 *     responses:
 *       200:
 *         description: Booking slot deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Booking slot not found
 */

/**
 * @swagger
 * /bookingSlots/user/{userId}:
 *   get:
 *     summary: Get booking slots by user ID
 *     tags: [BookingSlots]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of booking slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /bookingSlots/buyer/{buyerId}:
 *   get:
 *     summary: Get booking slots by buyer ID
 *     tags: [BookingSlots]
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Buyer ID
 *     responses:
 *       200:
 *         description: List of booking slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /bookingSlots/user/past:
 *   post:
 *     summary: Get past booking slots by user ID
 *     tags: [BookingSlots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date to compare
 *     responses:
 *       200:
 *         description: List of past booking slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /bookingSlots/user/future:
 *   post:
 *     summary: Get future booking slots by user ID
 *     tags: [BookingSlots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date to compare
 *     responses:
 *       200:
 *         description: List of future booking slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /bookingSlots/buyer/past:
 *   post:
 *     summary: Get past booking slots by buyer ID
 *     tags: [BookingSlots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerId:
 *                 type: string
 *                 description: Buyer ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date to compare
 *     responses:
 *       200:
 *         description: List of past booking slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /bookingSlots/buyer/future:
 *   post:
 *     summary: Get future booking slots by buyer ID
 *     tags: [BookingSlots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerId:
 *                 type: string
 *                 description: Buyer ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date to compare
 *     responses:
 *       200:
 *         description: List of future booking slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /bookingSlots:
 *   get:
 *     summary: Get all booking slots
 *     tags: [BookingSlots]
 *     responses:
 *       200:
 *         description: List of booking slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /bookingSlots/{id}/buyerStatus:
 *   put:
 *     summary: Update the buyer status of a booking slot
 *     tags: [BookingSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED]
 *                 description: New buyer status
 *     responses:
 *       200:
 *         description: Buyer status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Booking slot not found
 */

/**
 * @swagger
 * /bookingSlots/{id}/freelancerStatus:
 *   put:
 *     summary: Update the freelancer status of a booking slot
 *     tags: [BookingSlots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED]
 *                 description: New freelancer status
 *     responses:
 *       200:
 *         description: Freelancer status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingSlot'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Booking slot not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BookingSlot:
 *       type: object
 *       required:
 *         - freelancerSlotId
 *         - userId
 *         - buyerId
 *         - startTime
 *         - endTime
 *         - hourlyRate
 *         - totalPrice
 *       properties:
 *         freelancerSlotId:
 *           type: string
 *           description: ID of the freelancer time slot
 *         userId:
 *           type: string
 *           description: ID of the user who created the booking slot
 *         buyerId:
 *           type: string
 *           description: ID of the buyer who booked the slot
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Start time of the booking slot
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: End time of the booking slot
 *         hourlyRate:
 *           type: number
 *           description: Hourly rate for the booking slot
 *         totalPrice:
 *           type: number
 *           description: Total price for the booking slot
 *     Comment:
 *       type: object
 *       required:
 *         - taskId
 *         - userId
 *         - comment
 *         - totalPrice
 *         - status
 *       properties:
 *         taskId:
 *           type: string
 *           description: ID of the task
 *         userId:
 *           type: string
 *           description: ID of the user
 *         comment:
 *           type: string
 *           description: Comment text
 *         totalPrice:
 *           type: number
 *           description: Total price
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *           description: Status of the comment
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retrieve a list of roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   role:
 *                     type: string
 */

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Retrieve a single role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The role ID
 *     responses:
 *       200:
 *         description: A single role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: Role not found
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 role:
 *                   type: string
 */

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: Role not found
 */

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The role ID
 *     responses:
 *       200:
 *         description: Role deleted
 *       404:
 *         description: Role not found
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   address1:
 *                     type: string
 *                   address2:
 *                     type: string
 *                   address3:
 *                     type: string
 *                   telephoneNr:
 *                     type: string
 *                   mobileNr:
 *                     type: string
 *                   status:
 *                     type: string
 *                   profileImg:
 *                     type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 address1:
 *                   type: string
 *                 address2:
 *                   type: string
 *                 address3:
 *                   type: string
 *                 telephoneNr:
 *                   type: string
 *                 mobileNr:
 *                   type: string
 *                 status:
 *                   type: string
 *                 profileImg:
 *                   type: string
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               address3:
 *                 type: string
 *               telephoneNr:
 *                 type: string
 *               mobileNr:
 *                 type: string
 *               status:
 *                 type: string
 *               profileImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 address1:
 *                   type: string
 *                 address2:
 *                   type: string
 *                 address3:
 *                   type: string
 *                 telephoneNr:
 *                   type: string
 *                 mobileNr:
 *                   type: string
 *                 status:
 *                   type: string
 *                 profileImg:
 *                   type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               address3:
 *                 type: string
 *               telephoneNr:
 *                 type: string
 *               mobileNr:
 *                 type: string
 *               status:
 *                 type: string
 *               profileImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 address1:
 *                   type: string
 *                 address2:
 *                   type: string
 *                 address3:
 *                   type: string
 *                 telephoneNr:
 *                   type: string
 *                 mobileNr:
 *                   type: string
 *                 status:
 *                   type: string
 *                 profileImg:
 *                   type: string
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/withLoginInfo:
 *   get:
 *     summary: Retrieve a list of users with their login information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users with login information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   address1:
 *                     type: string
 *                   address2:
 *                     type: string
 *                   address3:
 *                     type: string
 *                   telephoneNr:
 *                     type: string
 *                   mobileNr:
 *                     type: string
 *                   status:
 *                     type: string
 *                   profileImg:
 *                     type: string
 *                   loginInfo:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       email:
 *                         type: string
 *                       userRoleId:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       status:
 *                         type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /loginInfo:
 *   get:
 *     summary: Retrieve a list of login information
 *     tags: [loginInfo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of login information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   userRoleId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   status:
 *                     type: string
 */

/**
 * @swagger
 * /loginInfo/{id}:
 *   get:
 *     summary: Retrieve a single login information by ID
 *     tags: [loginInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The login information ID
 *     responses:
 *       200:
 *         description: A single login information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 userRoleId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Login information not found
 */

/**
 * @swagger
 * /loginInfo:
 *   post:
 *     summary: Create a new login information
 *     tags: [loginInfo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userRoleId:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created login information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 userRoleId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 status:
 *                   type: string
 */

/**
 * @swagger
 * /loginInfo/{id}:
 *   put:
 *     summary: Update a login information by ID
 *     tags: [loginInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The login information ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userRoleId:
 *                 type: string
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated login information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 userRoleId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Login information not found
 */

/**
 * @swagger
 * /loginInfo/{id}:
 *   delete:
 *     summary: Delete a login information by ID
 *     tags: [loginInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The login information ID
 *     responses:
 *       200:
 *         description: Login information deleted
 *       404:
 *         description: Login information not found
 */

/**
 * @swagger
 * /loginInfo/updateRole:
 *   post:
 *     summary: Update the role of a user
 *     tags: [loginInfo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated login information with new role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 userRoleId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Invalid role or input
 *       404:
 *         description: Role or LoginInfo not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /paymentTypes:
 *   get:
 *     summary: Retrieve a list of payment types
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of payment types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   paymentType:
 *                     type: string
 *                   status:
 *                     type: string
 */

/**
 * @swagger
 * /paymentTypes/{id}:
 *   get:
 *     summary: Retrieve a single payment type by ID
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment type ID
 *     responses:
 *       200:
 *         description: A single payment type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 paymentType:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Payment type not found
 */

/**
 * @swagger
 * /paymentTypes:
 *   post:
 *     summary: Create a new payment type
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentType:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created payment type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 paymentType:
 *                   type: string
 *                 status:
 *                   type: string
 */

/**
 * @swagger
 * /paymentTypes/{id}:
 *   put:
 *     summary: Update a payment type by ID
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentType:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated payment type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 paymentType:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Payment type not found
 */

/**
 * @swagger
 * /paymentTypes/{id}:
 *   delete:
 *     summary: Delete a payment type by ID
 *     tags: [PaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment type ID
 *     responses:
 *       200:
 *         description: Payment type deleted
 *       404:
 *         description: Payment type not found
 */

/**
 * @swagger
 * /userPaymentTypes:
 *   get:
 *     summary: Retrieve a list of user payment types
 *     tags: [UserPaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user payment types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   paymentTypeId:
 *                     type: string
 */

/**
 * @swagger
 * /userPaymentTypes/{id}:
 *   get:
 *     summary: Retrieve a single user payment type by ID
 *     tags: [UserPaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user payment type ID
 *     responses:
 *       200:
 *         description: A single user payment type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 paymentTypeId:
 *                   type: string
 *       404:
 *         description: User payment type not found
 */

/**
 * @swagger
 * /userPaymentTypes:
 *   post:
 *     summary: Create a new user payment type
 *     tags: [UserPaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               paymentTypeId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created user payment type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 paymentTypeId:
 *                   type: string
 */

/**
 * @swagger
 * /userPaymentTypes/{id}:
 *   put:
 *     summary: Update a user payment type by ID
 *     tags: [UserPaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user payment type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               paymentTypeId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated user payment type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 paymentTypeId:
 *                   type: string
 *       404:
 *         description: User payment type not found
 */

/**
 * @swagger
 * /userPaymentTypes/{id}:
 *   delete:
 *     summary: Delete a user payment type by ID
 *     tags: [UserPaymentTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user payment type ID
 *     responses:
 *       200:
 *         description: User payment type deleted
 *       404:
 *         description: User payment type not found
 */

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Retrieve a list of profiles
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   profileName:
 *                     type: string
 *                   status:
 *                     type: string
 */

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Retrieve a single profile by ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile ID
 *     responses:
 *       200:
 *         description: A single profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 profileName:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Profile not found
 */

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileName:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 profileName:
 *                   type: string
 *                 status:
 *                   type: string
 */

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Update a profile by ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileName:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 profileName:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Profile not found
 */

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Delete a profile by ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile ID
 *     responses:
 *       200:
 *         description: Profile deleted
 *       404:
 *         description: Profile not found
 */

/**
 * @swagger
 * /userProfiles:
 *   get:
 *     summary: Retrieve a list of user profiles
 *     tags: [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   profileId:
 *                     type: string
 *                   userId:
 *                     type: string
 */

/**
 * @swagger
 * /userProfiles/{id}:
 *   get:
 *     summary: Retrieve a single user profile by ID
 *     tags: [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user profile ID
 *     responses:
 *       200:
 *         description: A single user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 profileId:
 *                   type: string
 *                 userId:
 *                   type: string
 *       404:
 *         description: User profile not found
 */

/**
 * @swagger
 * /userProfiles:
 *   post:
 *     summary: Create a new user profile
 *     tags: [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 profileId:
 *                   type: string
 *                 userId:
 *                   type: string
 */

/**
 * @swagger
 * /userProfiles/{id}:
 *   put:
 *     summary: Update a user profile by ID
 *     tags: [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 profileId:
 *                   type: string
 *                 userId:
 *                   type: string
 *       404:
 *         description: User profile not found
 */

/**
 * @swagger
 * /userProfiles/{id}:
 *   delete:
 *     summary: Delete a user profile by ID
 *     tags: [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user profile ID
 *     responses:
 *       200:
 *         description: User profile deleted
 *       404:
 *         description: User profile not found
 */

/**
 * @swagger
 * /userProfiles/user/{userId}:
 *   get:
 *     summary: Retrieve user profiles by user ID
 *     tags: [UserProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of user profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   profileId:
 *                     type: string
 *                   userId:
 *                     type: string
 *       404:
 *         description: User profiles not found
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   createdUserId:
 *                     type: string
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a single task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: A single task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 createdUserId:
 *                   type: string
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               createdUserId:
 *                 type: string
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 createdUserId:
 *                   type: string
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               createdUserId:
 *                 type: string
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 createdUserId:
 *                   type: string
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /tasks/userId:
 *   get:
 *     summary: Retrieve tasks by user ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   createdUserId:
 *                     type: string
 *                   createdDate:
 *                     type: string
 *                     format: date-time
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *       404:
 *         description: Tasks not found
 */

/**
 * @swagger
 * /tasks/toggleStatus/{id}:
 *   put:
 *     summary: Toggle the status of a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The updated task with toggled status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 createdUserId:
 *                   type: string
 *                 createdDate:
 *                   type: string
 *                   format: date-time
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /taskProfiles:
 *   get:
 *     summary: Retrieve a list of task profiles
 *     tags: [TaskProfiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of task profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   taskId:
 *                     type: string
 *                   profileId:
 *                     type: string
 *                   requiredLevel:
 *                     type: string
 *                   status:
 *                     type: string
 */

/**
 * @swagger
 * /taskProfiles/{id}:
 *   get:
 *     summary: Retrieve a single task profile by ID
 *     tags: [TaskProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task profile ID
 *     responses:
 *       200:
 *         description: A single task profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 profileId:
 *                   type: string
 *                 requiredLevel:
 *                   type: string
 *                 status:
 *       404:
 *         description: Task profile not found
 */

/**
 * @swagger
 * /taskProfiles:
 *   post:
 *     summary: Create a new task profile
 *     tags: [TaskProfiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               profileId:
 *                 type: string
 *               requiredLevel:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created task profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 profileId:
 *                   type: string
 *                 requiredLevel:
 *                   type: string
 *                 status:
 *                   type: string
 */

/**
 * @swagger
 * /taskProfiles/{id}:
 *   put:
 *     summary: Update a task profile by ID
 *     tags: [TaskProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               profileId:
 *                 type: string
 *               requiredLevel:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated task profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 profileId:
 *                   type: string
 *                 requiredLevel:
 *                   type: string
 *                 status:
 *       404:
 *         description: Task profile not found
 */

/**
 * @swagger
 * /taskProfiles/{id}:
 *   delete:
 *     summary: Delete a task profile by ID
 *     tags: [TaskProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task profile ID
 *     responses:
 *       200:
 *         description: Task profile deleted
 *       404:
 *         description: Task profile not found
 */

/**
 * @swagger
 * /taskProfiles/task/{taskId}:
 *   get:
 *     summary: Retrieve all profiles by task ID
 *     tags: [TaskProfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: A list of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   profileName:
 *                     type: string
 *                   status:
 *                     type: string
 */

/**
 * @swagger
 * /UserLocationInfo:
 *   get:
 *     summary: Retrieve a list of user location infos
 *     tags: [UserLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user location infos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *                   userId:
 *                     type: string
 *                   status:
 *                     type: string
 */

/**
 * @swagger
 * /UserLocationInfo/{id}:
 *   get:
 *     summary: Retrieve a single user location info by ID
 *     tags: [UserLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user location info ID
 *     responses:
 *       200:
 *         description: A single user location info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *                 userId:
 *                   type: string
 *                 status:
 *       404:
 *         description: User location info not found
 */

/**
 * @swagger
 * /UserLocationInfo:
 *   post:
 *     summary: Create a new user location info
 *     tags: [UserLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created user location info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *                 userId:
 *                   type: string
 *                 status:
 */

/**
 * @swagger
 * /UserLocationInfo/{id}:
 *   put:
 *     summary: Update a user location info by ID
 *     tags: [UserLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user location info ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated user location info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *                 userId:
 *                   type: string
 *                 status:
 *       404:
 *         description: User location info not found
 */

/**
 * @swagger
 * /UserLocationInfo/{id}:
 *   delete:
 *     summary: Delete a user location info by ID
 *     tags: [UserLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user location info ID
 *     responses:
 *       200:
 *         description: User location info deleted
 *       404:
 *         description: User location info not found
 */

/**
 * @swagger
 * /TaskLocationInfo:
 *   get:
 *     summary: Retrieve a list of task location infos
 *     tags: [TaskLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of task location infos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *                   taskId:
 *                     type: string
 *                   status:
 */

/**
 * @swagger
 * /TaskLocationInfo/{id}:
 *   get:
 *     summary: Retrieve a single task location info by ID
 *     tags: [TaskLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task location info ID
 *     responses:
 *       200:
 *         description: A single task location info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *                 taskId:
 *                   type: string
 *                 status:
 *       404:
 *         description: Task location info not found
 */

/**
 * @swagger
 * /TaskLocationInfo:
 *   post:
 *     summary: Create a new task location info
 *     tags: [TaskLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               taskId:
 *                 type: string
 *               status:
 *     responses:
 *       201:
 *         description: The created task location info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *                 taskId:
 *                   type: string
 *                 status:
 */

/**
 * @swagger
 * /TaskLocationInfo/{id}:
 *   put:
 *     summary: Update a task location info by ID
 *     tags: [TaskLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task location info ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               taskId:
 *                 type: string
 *               status:
 *     responses:
 *       200:
 *         description: The updated task location info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 latitude:
 *                   type: number
 *                 longitude:
 *                   type: number
 *                 taskId:
 *                   type: string
 *                 status:
 *       404:
 *         description: Task location info not found
 */

/**
 * @swagger
 * /TaskLocationInfo/{id}:
 *   delete:
 *     summary: Delete a task location info by ID
 *     tags: [TaskLocationInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task location info ID
 *     responses:
 *       200:
 *         description: Task location info deleted
 *       404:
 *         description: Task location info not found
 */

/**
 * @swagger
 * /attachments:
 *   get:
 *     summary: Retrieve a list of attachments
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of attachments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   taskId:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 */

/**
 * @swagger
 * /attachments/{id}:
 *   get:
 *     summary: Retrieve a single attachment by ID
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The attachment ID
 *     responses:
 *       200:
 *         description: A single attachment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *       404:
 *         description: Attachment not found
 */

/**
 * @swagger
 * /attachments:
 *   post:
 *     summary: Create a new attachment
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created attachment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 */

/**
 * @swagger
 * /attachments/{id}:
 *   put:
 *     summary: Update an attachment by ID
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The attachment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *     responses:
 *       200:
 *         description: The updated attachment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *       404:
 *         description: Attachment not found
 */

/**
 * @swagger
 * /attachments/{id}:
 *   delete:
 *     summary: Delete an attachment by ID
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The attachment ID
 *     responses:
 *       200:
 *         description: Attachment deleted
 *       404:
 *         description: Attachment not found
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Retrieve a list of comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   taskId:
 *                     type: string
 *                   comment:
 *                     type: string
 *                   status:
 */

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Retrieve a single comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: A single comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 comment:
 *                   type: string
 *                 status:
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The created comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               comment:
 *                 type: string
 *               status:
 *     responses:
 *       200:
 *         description: The updated comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 comment:
 *                   type: string
 *                 status:
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /comments/task/{taskId}:
 *   get:
 *     summary: Retrieve comments by task ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   taskId:
 *                     type: string
 *                   comment:
 *                     type: string
 *                   status:
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /employerHistories:
 *   get:
 *     summary: Retrieve a list of employer histories
 *     tags: [EmployerHistories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of employer histories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   taskId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   description:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   taskStatus:
 *                     type: string
 *                   status:
 */

/**
 * @swagger
 * /employerHistories/{id}:
 *   get:
 *     summary: Retrieve a single employer history by ID
 *     tags: [EmployerHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employer history ID
 *     responses:
 *       200:
 *         description: A single employer history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 taskStatus:
 *                   type: string
 *                 status:
 *       404:
 *         description: Employer history not found
 */

/**
 * @swagger
 * /employerHistories:
 *   post:
 *     summary: Create a new employer history
 *     tags: [EmployerHistories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               userId:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               taskStatus:
 *                 type: string
 *               status:
 *     responses:
 *       201:
 *         description: The created employer history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 taskStatus:
 *                   type: string
 *                 status:
 */

/**
 * @swagger
 * /employerHistories/{id}:
 *   put:
 *     summary: Update an employer history by ID
 *     tags: [EmployerHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employer history ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               userId:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               taskStatus:
 *                 type: string
 *               status:
 *     responses:
 *       200:
 *         description: The updated employer history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 taskStatus:
 *                   type: string
 *                 status:
 *       404:
 *         description: Employer history not found
 */

/**
 * @swagger
 * /employerHistories/{id}:
 *   delete:
 *     summary: Delete an employer history by ID
 *     tags: [EmployerHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employer history ID
 *     responses:
 *       200:
 *         description: Employer history deleted
 *       404:
 *         description: Employer history not found
 */

/**
 * @swagger
 * /employeeHistories:
 *   get:
 *     summary: Retrieve a list of employee histories
 *     tags: [EmployeeHistories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of employee histories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   taskId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   description:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   taskStatus:
 *                     type: string
 *                   status:
 */

/**
 * @swagger
 * /employeeHistories/{id}:
 *   get:
 *     summary: Retrieve a single employee history by ID
 *     tags: [EmployeeHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee history ID
 *     responses:
 *       200:
 *         description: A single employee history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 taskStatus:
 *                   type: string
 *                 status:
 *       404:
 *         description: Employee history not found
 */

/**
 * @swagger
 * /employeeHistories:
 *   post:
 *     summary: Create a new employee history
 *     tags: [EmployeeHistories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               userId:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               taskStatus:
 *                 type: string
 *               status:
 *     responses:
 *       201:
 *         description: The created employee history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 taskStatus:
 *                   type: string
 *                 status:
 */

/**
 * @swagger
 * /employeeHistories/{id}:
 *   put:
 *     summary: Update an employee history by ID
 *     tags: [EmployeeHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee history ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               userId:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: number
 *               taskStatus:
 *                 type: string
 *               status:
 *     responses:
 *       200:
 *         description: The updated employee history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 taskId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 description:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 taskStatus:
 *                   type: string
 *                 status:
 *       404:
 *         description: Employee history not found
 */

/**
 * @swagger
 * /employeeHistories/{id}:
 *   delete:
 *     summary: Delete an employee history by ID
 *     tags: [EmployeeHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee history ID
 *     responses:
 *       200:
 *         description: Employee history deleted
 *       404:
 *         description: Employee history not found
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               profileImg:
 *                 type: string
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               address3:
 *                 type: string
 *               telephoneNr:
 *                 type: string
 *               mobileNr:
 *                 type: string
 *               status:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, Freelancer, Buyer]
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or email already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /analyse:
 *   post:
 *     summary: Analyze user ratings based on latitude and longitude
 *     tags: [Analyse]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ratings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                     longitude:
 *                       type: number
 *                     rating:
 *                       type: number
 *     responses:
 *       200:
 *         description: Analysis successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       latitude:
 *                         type: number
 *                       longitude:
 *                         type: number
 *                       rating:
 *                         type: number
 *                       distance:
 *                         type: number
 *                       score:
 *                         type: number
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /search/loadAllFreelancersByFilter:
 *   get:
 *     summary: Retrieve a list of freelancers with filters
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstName
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by first name
 *       - in: query
 *         name: lastName
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by last name
 *       - in: query
 *         name: profiles
 *         required: false
 *         schema:
 *           type: string
 *           example: 'GUI,Programming'
 *         description: Filter by profiles (comma-separated values)
 *     responses:
 *       200:
 *         description: A list of freelancers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   roleId:
 *                     type: string
 *                   loginInfo:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       status:
 *                         type: string
 */

/**
 * @swagger
 * /search/users:
 *   get:
 *     summary: Search users by name
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name to search for
 *     responses:
 *       200:
 *         description: A list of users matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   address1:
 *                     type: string
 *                   address2:
 *                     type: string
 *                   address3:
 *                     type: string
 *                   telephoneNr:
 *                     type: string
 *                   mobileNr:
 *                     type: string
 *                   status:
 *                     type: string
 */

/**
 * @swagger
 * /users/toggleStatus/{id}:
 *   put:
 *     summary: Toggle the status of a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The updated user with toggled status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 address1:
 *                   type: string
 *                 address2:
 *                   type: string
 *                 address3:
 *                   type: string
 *                 telephoneNr:
 *                   type: string
 *                 mobileNr:
 *                   type: string
 *                 status:
 *                   type: string
 *                 profileImg:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /freelancerTimeSlots:
 *   get:
 *     summary: Retrieve a list of freelancer time slots
 *     tags: [FreelancerTimeSlots]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of freelancer time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   available:
 *                     type: boolean
 *                   status:
 *                     type: string
 *                   timeSlotStatus:
 *                     type: string
 *                     enum: [Available, Unavailable, Deleted, Marked_As_Allocated]
 *                   timeSlots:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         start:
 *                           type: string
 *                         end:
 *                           type: string
 */

/**
 * @swagger
 * /freelancerTimeSlots/{id}:
 *   get:
 *     summary: Retrieve a single freelancer time slot by ID
 *     tags: [FreelancerTimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The freelancer time slot ID
 *     responses:
 *       200:
 *         description: A single freelancer time slot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 available:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 timeSlotStatus:
 *                   type: string
 *                   enum: [Available, Unavailable, Deleted, Marked_As_Allocated]
 *                 timeSlots:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       start:
 *                         type: string
 *                       end:
 *                         type: string
 *       404:
 *         description: Freelancer time slot not found
 */

/**
 * @swagger
 * /freelancerTimeSlots:
 *   post:
 *     summary: Create a new freelancer time slot
 *     tags: [FreelancerTimeSlots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               available:
 *                 type: boolean
 *               status:
 *                 type: string
 *               timeSlotStatus:
 *                 type: string
 *                 enum: [Available, Unavailable, Deleted, Marked_As_Allocated]
 *               timeSlots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     start:
 *                       type: string
 *                     end:
 *                       type: string
 *     responses:
 *       201:
 *         description: The created freelancer time slot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 available:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 timeSlotStatus:
 *                   type: string
 *                   enum: [Available, Unavailable, Deleted, Marked_As_Allocated]
 *                 timeSlots:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       start:
 *                         type: string
 *                       end:
 *                         type: string
 */

/**
 * @swagger
 * /freelancerTimeSlots/{id}:
 *   put:
 *     summary: Update a freelancer time slot by ID
 *     tags: [FreelancerTimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The freelancer time slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               available:
 *                 type: boolean
 *               status:
 *                 type: string
 *               timeSlotStatus:
 *                 type: string
 *                 enum: [Available, Unavailable, Deleted, Marked_As_Allocated]
 *               timeSlots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     start:
 *                       type: string
 *                     end:
 *                       type: string
 *     responses:
 *       200:
 *         description: The updated freelancer time slot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 available:
 *                   type: boolean
 *                 status:
 *                   type: string
 *                 timeSlotStatus:
 *                   type: string
 *                   enum: [Available, Unavailable, Deleted, Marked_As_Allocated]
 *                 timeSlots:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       start:
 *                         type: string
 *                       end:
 *                         type: string
 *       404:
 *         description: Freelancer time slot not found
 */

/**
 * @swagger
 * /freelancerTimeSlots/{id}:
 *   delete:
 *     summary: Delete a freelancer time slot by ID
 *     tags: [FreelancerTimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The freelancer time slot ID
 *     responses:
 *       200:
 *         description: Freelancer time slot deleted
 *       404:
 *         description: Freelancer time slot not found
 */

/**
 * @swagger
 * /freelancerTimeSlots/slot/search:
 *   get:
 *     summary: Search for freelancer time slots
 *     tags: [FreelancerTimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date
 *     responses:
 *       200:
 *         description: A list of freelancer time slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   available:
 *                     type: boolean
 *                   status:
 *                     type: string
 *                   timeSlotStatus:
 *                     type: string
 *                     enum: [Available, Unavailable, Deleted, Marked_As_Allocated]
 *                   timeSlots:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         start:
 *                           type: string
 *                         end:
 *                           type: string
 */

/**
 * @swagger
 * /taskOffereds:
 *   post:
 *     summary: Create a new task offered
 *     tags: [TaskOffereds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *               - offerUserId
 *               - commentId
 *             properties:
 *               taskId:
 *                 type: string
 *                 description: ID of the task
 *               offerUserId:
 *                 type: string
 *                 description: ID of the user making the offer
 *               commentId:
 *                 type: string
 *                 description: ID of the comment
 *     responses:
 *       201:
 *         description: The created task offered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskOffered'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /taskOffereds/{id}:
 *   put:
 *     summary: Update a task offered by ID
 *     tags: [TaskOffereds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task offered ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskOffered'
 *     responses:
 *       200:
 *         description: The updated task offered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskOffered'
 *       404:
 *         description: Task offered not found
 */

/**
 * @swagger
 * /taskOffereds/{id}/freelancerStatus:
 *   put:
 *     summary: Update the freelancer status of a task offered
 *     tags: [TaskOffereds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task offered ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED]
 *                 description: New freelancer status
 *     responses:
 *       200:
 *         description: Freelancer status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskOffered'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task offered not found
 */

/**
 * @swagger
 * /taskOffereds/{id}/buyerStatus:
 *   put:
 *     summary: Update the buyer status of a task offered
 *     tags: [TaskOffereds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task offered ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, CONFIRMED, CANCELLED]
 *                 description: New buyer status
 *     responses:
 *       200:
 *         description: Buyer status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskOffered'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task offered not found
 */

/**
 * @swagger
 * /taskOffereds/{id}:
 *   delete:
 *     summary: Delete a task offered by ID
 *     tags: [TaskOffereds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task offered ID
 *     responses:
 *       200:
 *         description: Task offered deleted
 *       404:
 *         description: Task offered not found
 */

/**
 * @swagger
 * /taskOffereds:
 *   get:
 *     summary: Search for task offereds
 *     tags: [TaskOffereds]
 *     parameters:
 *       - in: query
 *         name: taskId
 *         schema:
 *           type: string
 *         description: Filter by task ID
 *       - in: query
 *         name: offerUserId
 *         schema:
 *           type: string
 *         description: Filter by offer user ID
 *     responses:
 *       200:
 *         description: A list of task offereds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskOffered'
 */

/**
 * @swagger
 * /taskOffereds/offerUser/{offerUserId}:
 *   get:
 *     summary: Get tasks by offer user ID
 *     tags: [TaskOffereds]
 *     parameters:
 *       - in: path
 *         name: offerUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: Offer user ID
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskOffered'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tasks not found
 */

/**
 * @swagger
 * /taskOffereds/createdUser/{createdUserId}:
 *   get:
 *     summary: Get tasks by created user ID
 *     tags: [TaskOffereds]
 *     parameters:
 *       - in: path
 *         name: createdUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: Created user ID
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tasks not found
 */

/**
 * @swagger
 * /ratings:
 *   get:
 *     summary: Retrieve a list of all ratings
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   buyerId:
 *                     type: string
 *                   freelancerId:
 *                     type: string
 *                   type:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   taskOrBookingId:
 *                     type: string
 *       404:
 *         description: Ratings not found
 */

/**
 * @swagger
 * /ratings/{id}:
 *   get:
 *     summary: Retrieve a single rating by ID
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The rating ID
 *     responses:
 *       200:
 *         description: A single rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 buyerId:
 *                   type: string
 *                 freelancerId:
 *                   type: string
 *                 type:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 taskOrBookingId:
 *                   type: string
 *       404:
 *         description: Rating not found
 */

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Create a new rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyerId
 *               - freelancerId
 *               - type
 *               - rating
 *               - taskOrBookingId
 *             properties:
 *               buyerId:
 *                 type: string
 *               freelancerId:
 *                 type: string
 *               type:
 *                 type: string
 *               rating:
 *                 type: number
 *               taskOrBookingId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 buyerId:
 *                   type: string
 *                 freelancerId:
 *                   type: string
 *                 type:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 taskOrBookingId:
 *                   type: string
 */

/**
 * @swagger
 * /ratings/{id}:
 *   put:
 *     summary: Update a rating by ID
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The rating ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerId:
 *                 type: string
 *               freelancerId:
 *                 type: string
 *               type:
 *                 type: string
 *               rating:
 *                 type: number
 *               taskOrBookingId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 buyerId:
 *                   type: string
 *                 freelancerId:
 *                   type: string
 *                 type:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 taskOrBookingId:
 *                   type: string
 *       404:
 *         description: Rating not found
 */

/**
 * @swagger
 * /ratings/{id}:
 *   delete:
 *     summary: Delete a rating by ID
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The rating ID
 *     responses:
 *       200:
 *         description: Rating deleted
 *       404:
 *         description: Rating not found
 */

/**
 * @swagger
 * /ratings/buyer/{buyerId}:
 *   get:
 *     summary: Retrieve ratings by buyer ID
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The buyer ID
 *     responses:
 *       200:
 *         description: A list of ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   buyerId:
 *                     type: string
 *                   freelancerId:
 *                     type: string
 *                   type:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   taskOrBookingId:
 *                     type: string
 *       404:
 *         description: Ratings not found
 */

/**
 * @swagger
 * /ratings/freelancer/{freelancerId}:
 *   get:
 *     summary: Retrieve ratings by freelancer ID
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: freelancerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The freelancer ID
 *     responses:
 *       200:
 *         description: A list of ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   buyerId:
 *                     type: string
 *                   freelancerId:
 *                     type: string
 *                   type:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   taskOrBookingId:
 *                     type: string
 *       404:
 *         description: Ratings not found
 */

/**
 * @swagger
 * /taskOffereds/offerUser/{offerUserId}:
 *   get:
 *     summary: Get tasks by offer user ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: offerUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: Offer user ID
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskOffered'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tasks not found
 */

/**
 * @swagger
 * /taskOffereds/createdUser/{createdUserId}:
 *   get:
 *     summary: Get tasks by created user ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: createdUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: Created user ID
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Tasks not found
 */