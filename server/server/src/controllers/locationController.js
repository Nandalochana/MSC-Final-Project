const Location = require('../models/locationModel');

class LocationController {
    // Insert or Update a location
    async upsertLocation(req, res) {
        const { userId, status, latitude, longitude } = req.body;

        try {
            const location = await Location.findOneAndUpdate(
                { userId }, // Search by userId
                { status, latitude, longitude }, // Update fields
                { new: true, upsert: true } // Create if not found
            );

            res.status(200).end();
        } catch (error) {
            res.status(500).end();
        }
    }

    // Delete a location by userId
    async deleteLocation(req, res) {
        const { userId } = req.params;

        try {
            const result = await Location.findOneAndDelete({ userId });

            if (!result) {
                return res.status(404).end();
            }

            res.status(200).end();
        } catch (error) {
            res.status(500).end();
        }
    }

    // Search locations by query parameters
    async searchLocations(req, res) {
        const { userId, status } = req.query;

        try {
            const query = {};
            if (userId) query.userId = userId;
            if (status) query.status = status;

            const locations = await Location.find(query);

            res.status(200).end();
        } catch (error) {
            res.status(500).end();
        }
    }
}

module.exports = LocationController;