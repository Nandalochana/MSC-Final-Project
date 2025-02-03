const User = require('../models/user');
const roles = require('../models/role');
const loginInfo = require('../models/loginInfo');

class SearchController {
    async loadAllFreelancers(req, res) {
        try {
            const users = await User.find();
            const freelancerRole = await roles.findOne({ type: 'Freelancer' });
            const freelancers = users.filter(user => user.roleId.equals(freelancerRole._id));
            const freelancersWithLoginInfo = await Promise.all(freelancers.map(async freelancer => {
                const login = await loginInfo.findOne({ userRoleId: freelancer._id });
                return { ...freelancer.toObject(), loginInfo: login };
            }));
            res.status(200).json(freelancersWithLoginInfo);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error loading freelancers', error });
        }
    }

    async searchUserByName(req, res) {
        const { name } = req.query;
        try {
            const users = await User.find({
                $or: [
                    { firstName: { $regex: name, $options: 'i' } },
                    { lastName: { $regex: name, $options: 'i' } }
                ]
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error searching users', error });
        }
    }
}

module.exports = SearchController;
