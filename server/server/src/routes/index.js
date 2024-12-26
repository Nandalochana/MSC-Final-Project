const RoleController = require('../controllers/roleController');
const LoginInfoController = require('../controllers/loginInfoController');

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Role management
 *   - name: LoginInfos
 *     description: Login information management
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retrieve a list of roles
 *     tags: [Roles]
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
 * /loginInfos:
 *   get:
 *     summary: Retrieve a list of login information
 *     tags: [LoginInfos]
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
 * /loginInfos/{id}:
 *   get:
 *     summary: Retrieve a single login information by ID
 *     tags: [LoginInfos]
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
 * /loginInfos:
 *   post:
 *     summary: Create a new login information
 *     tags: [LoginInfos]
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
 * /loginInfos/{id}:
 *   put:
 *     summary: Update a login information by ID
 *     tags: [LoginInfos]
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
 * /loginInfos/{id}:
 *   delete:
 *     summary: Delete a login information by ID
 *     tags: [LoginInfos]
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

function setRoutes(app) {
    const roleController = new RoleController();
    app.get('/roles', roleController.getRoles.bind(roleController));
    app.get('/roles/:id', roleController.getRoleById.bind(roleController));
    app.post('/roles', roleController.createRole.bind(roleController));
    app.put('/roles/:id', roleController.updateRole.bind(roleController));
    app.delete('/roles/:id', roleController.deleteRole.bind(roleController));

    const loginInfoController = new LoginInfoController();
    app.get('/loginInfos', loginInfoController.getLoginInfos.bind(loginInfoController));
    app.get('/loginInfos/:id', loginInfoController.getLoginInfoById.bind(loginInfoController));
    app.post('/loginInfos', loginInfoController.createLoginInfo.bind(loginInfoController));
    app.put('/loginInfos/:id', loginInfoController.updateLoginInfo.bind(loginInfoController));
    app.delete('/loginInfos/:id', loginInfoController.deleteLoginInfo.bind(loginInfoController));
}

module.exports = setRoutes;