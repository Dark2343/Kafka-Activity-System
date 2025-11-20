const ActivityModel = require('../models/activityModel')

class ActivityRepository {
    constructor() {}

    async save(activity) {
        const model = new ActivityModel({
            userId: activity.userId,
            eventType: activity.eventType,
            timestamp: activity.timestamp
        })

        try{
            await model.save()
        } catch(e) {
            console.error("Problem with saving activity: ", e)
        }
    }

    async getLogs(filter, { offset, limit }){
        return await ActivityModel.find(filter).sort({ timestamp: -1 }).skip(offset).limit(limit)
    }
}

module.exports = ActivityRepository