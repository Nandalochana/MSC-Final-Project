const User = require('../models/user');
const roles = require('../models/role');
const loginInfo = require('../models/loginInfo');
const SystemRoles = require('../utils/systemEnums');

class SearchController {
    async loadAllFreelancersByFilter(req, res) {
        const { name, profiles } = req.query;

    
        try {
            const freelancerRole = await roles.findOne({ role: SystemRoles.Freelancer });
        
            // Get all active freelancers
            const loginInfoList = await loginInfo.find({ userRoleId: freelancerRole._id, status: 'active' });
            const userIds = loginInfoList.map(info => info.userId);

            // MongoDB query with regex for name search
            let query = { _id: { $in: userIds } };
            if (name) {
                query.$or = [
                    { firstName: { $regex: name, $options: "i" } },
                    { lastName: { $regex: name, $options: "i" } }
                ];
            }
    
            const systemUsers = await User.find(query);
    
            res.status(200).json({ data: systemUsers });
        } catch (error) {
            console.error("Error loading freelancers:", error);
            res.status(500).json({ message: "Error loading freelancers", error });
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
