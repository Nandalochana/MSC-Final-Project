const Role = require('../models/role');

class RoleController {
    async getRoles(req, res) {
        const roles = await Role.find();
        res.status(200).json(roles);
    }

    async getRoleById(req, res) {
        const role = await Role.findById(req.params.id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    }

    async createRole(req, res) {
        const newRole = new Role(req.body);
        await newRole.save();
        res.status(201).json(newRole);
    }

    async updateRole(req, res) {
        const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedRole) {
            res.status(200).json(updatedRole);
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    }

    async deleteRole(req, res) {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (deletedRole) {
            res.status(200).json({ message: 'Role deleted' });
        } else {
            res.status(404).json({ message: 'Role not found' });
        }
    }
}

module.exports = RoleController;