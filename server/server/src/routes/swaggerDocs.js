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
 *         application/json:
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
 *         application/json:
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