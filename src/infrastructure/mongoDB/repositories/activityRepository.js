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

    async getAllLogs(){
        return await ActivityModel.find().sort({ timestamp: -1 });
    }
    
    async getLogsByUser(userId){
        return await ActivityModel.find({ userId: userId }).sort({ timestamp: -1});
    }
    
    async getLogsByEventType(eventType){
        return await ActivityModel.find({ eventType: eventType }).sort({ timestamp: -1});
    }
}

module.exports = ActivityRepository