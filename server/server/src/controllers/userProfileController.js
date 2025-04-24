const Rating = require('../models/rating');
const UserProfile = require('../models/userProfile');

class UserProfileController {
    async getUserProfiles(req, res) {
        const userProfiles = await UserProfile.find().populate('profileId').populate('userId');
        res.status(200).json({ data: userProfiles });
    }

    async getUserProfileById(req, res) {
        console.log('getUserProfileById');
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const userProfile = await UserProfile.findById(id).populate('profileId').populate('userId');
        if (userProfile) {
            res.status(200).json(userProfile);
        } else {
            res.status(404).json({ message: 'UserProfile not found' });
        }
    }

    async getUserProfileByUserId(req, res) {
        console.log('getUserById-method f');
        try {
            const systemUsers = await UserProfile.find({ userId: req.params.userId }).populate('profileId').populate('userId');
            const systemUsersWithRatings = await Promise.all(systemUsers.map(async user => {
                const rating = Number(await this.calculateUserRating(user.userId));
                const userWithDetails = {
                    ...user.toObject(), // Convert Mongoose document to plain object
                    rating, // Add calculated rating
                };
                return userWithDetails;
            }));
            console.log("User with details:", systemUsersWithRatings); // Log the single user response
            res.status(200).json({ data: systemUsersWithRatings });
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

    async createUserProfile(req, res) {
        try {
            const { profileId, userId } = req.body;
            const existingUserProfile = await UserProfile.findOne({ profileId, userId });
            if (existingUserProfile) {
                return res.status(400).json({ message: 'User already Added this Category !' });
            }
            const newUserProfile = new UserProfile(req.body);
            await newUserProfile.save();
            res.status(201).json(newUserProfile);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateUserProfile(req, res) {
        const updatedUserProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('profileId').populate('userId');
        if (updatedUserProfile) {
            res.status(200).json(updatedUserProfile);
        } else {
            res.status(404).json({ message: 'UserProfile not found' });
        }
    }

    async deleteUserProfile(req, res) {
        const deletedUserProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (deletedUserProfile) {
            res.status(200).json({ message: 'UserProfile deleted' });
        } else {
            res.status(404).json({ message: 'UserProfile not found' });
        }
    }
}

module.exports = UserProfileController;