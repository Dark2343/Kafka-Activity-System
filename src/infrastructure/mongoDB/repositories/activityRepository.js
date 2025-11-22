const ActivityModel = require('../models/activityModel')

// The Repository that interacts and queries the database
class ActivityRepository {
    constructor() {}
    
    // Takes an activity object and saves it in the DB
    async save(activity) {
        
        // Create a new model to save it in the DB with
        const model = new ActivityModel({
            userId: activity.userId,
            eventType: activity.eventType,
            timestamp: activity.timestamp
        })

        try{
            // Saves it
            await model.save()
        } catch(e) {
            console.error("Problem with saving activity: ", e)
        }
    }

    // Queries our DB with the filtered list and optional offset and limit parameters
    async getLogs(filter, { offset, limit }){
        return await ActivityModel.find(filter).sort({ timestamp: -1 }).skip(offset).limit(limit)
    }
}

module.exports = ActivityRepository