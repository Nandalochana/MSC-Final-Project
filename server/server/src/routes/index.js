function setRoutes(app, indexController) {
    app.get('/items', indexController.getItems.bind(indexController));
    app.post('/items', indexController.createItem.bind(indexController));
    app.post('/login', indexController.login.bind(indexController));
    app.post('/logout', indexController.logout.bind(indexController));
}

module.exports = setRoutes;