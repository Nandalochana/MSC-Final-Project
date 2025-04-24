const User = require('../models/user');
const roles = require('../models/role');
const loginInfo = require('../models/loginInfo');
const SystemRoles = require('../utils/systemEnums');
const Rating = require('../models/rating');
const Location = require('../models/locationModel');
const axios = require('axios'); // Add axios for making HTTP requests


class SearchController {
    async loadAllFreelancersByFilter(req, res) {
        const { name, profiles,rating } = req.query;
        try {
            const freelancerRole = await roles.findOne({ role: SystemRoles.Freelancer });
            const loginInfoList = await loginInfo.find({ userRoleId: freelancerRole._id, status: 'active' });
            const userIds = loginInfoList.map(info => info.userId);
            let query = { _id: { $in: userIds } };
            if (name) {
                query.$or = [
                    { firstName: { $regex: name, $options: "i" } },
                    { lastName: { $regex: name, $options: "i" } }
                ];
            }
            const systemUsers = await User.find(query);
            const systemUsersWithRatings = await Promise.all(systemUsers.map(async user => {
                const location = await this.getUserLocation(user._id); // Fetch latitude and longitude
                const userWithDetails = {
                    ...user.toObject(), // Convert Mongoose document to plain object
                    rating: Number(await this.calculateUserRating(user._id)), // Calculate rating for each user
                    latitude: location.latitude, // Add latitude
                    longitude: location.longitude // Add longitude
                };
                return userWithDetails;
            }));

              // Apply rating filter if provided
              if (rating) {
                filteredUsers = filteredUsers.filter(user => user.rating >= Number(rating[0]));
            }

            // Prepare data for AI analysis
            const ratingsData = systemUsersWithRatings.map(user => ({
                userId: user._id,
                latitude: user.latitude,
                longitude: user.longitude,
                rating: user.rating
            }));

            // Call the AI analysis endpoint
            const aiResponse = await axios.post('http://localhost:3000/analyse', { ratings: ratingsData });
            const analyzedData = aiResponse.data.result;

            // Map scores back to users
            const analyzedDataMap = new Map(analyzedData.map(item => [item.userId, item.score]));

            // Filter and include scores
            let filteredUsers = systemUsersWithRatings.map(user => ({
                ...user,
                score: analyzedDataMap.get(user._id.toString()) || 0 // Convert _id to string for matching
            }));

            res.status(200).json({ data: filteredUsers });
        } catch (error) {
            console.error("Error loading freelancers:", error);
            res.status(500).json({ message: "Error loading freelancers", error });
        }
    }

    async calculateUserRating(userId) {
        try {
            // Fetch all reviews for the given user
            const reviews = await Rating.find({ freelancerId: userId });

            if (reviews.length === 0) {
                return 0;
            }
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            const value = averageRating.toFixed(2); // Return the average rating rounded to 2 decimal places
            return value; // Return the average rating
        } catch (error) {
            console.error(`Error calculating rating for user ${userId}:`, error);
            return 0; // Return 0 in case of an error
        }
    }

    async getUserLocation(userId) {
        try {
            const locationInfo = await Location.findOne({ userId: userId });
            return {
                latitude: locationInfo ? locationInfo.latitude : 0, // Return latitude or 0 if not found
                longitude: locationInfo ? locationInfo.longitude : 0 // Return longitude or 0 if not found
            };
        } catch (error) {
            console.error(`Error fetching location for user ${userId}:`, error);
            return { latitude: 0, longitude: 0 }; // Return 0 for both in case of an error
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
