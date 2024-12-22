const User = require('../models/user');

class IndexController {
    constructor() {
        this.items = [];
    }

    getItems(req, res) {
        res.json(this.items);
    }

    createItem(req, res) {
        const newItem = req.body;
        this.items.push(newItem);
        res.status(201).json(newItem);
    }

    async login(req, res) {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await user.comparePassword(password)) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    }

    async logout(req, res) {
        // Implement logout logic (e.g., clearing session or token)
        res.status(200).json({ message: 'Logout successful' });
    }
}

module.exports = IndexController;