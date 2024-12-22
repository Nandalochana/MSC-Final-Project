class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    static validate(item) {
        if (!item.name || !item.description) {
            throw new Error('Invalid item: name and description are required.');
        }
    }

    // Additional methods for interacting with the database can be added here
}

module.exports = Item;