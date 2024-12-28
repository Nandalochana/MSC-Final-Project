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
 *   - name: Authentication
 *     description: User authentication
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
 *                   type: string
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
 *                   type: string
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
 *       401:
 *         description: Invalid email or password
 */