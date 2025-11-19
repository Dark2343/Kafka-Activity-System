const ActivityModel = require('../models/activityModel')

class ActivityRepository {
    constructor() {}

    async save(activity) {
        const model = new ActivityModel({
            userId: activity.userId,
            eventType: activity.eventType,
            timestamp: activity.timestamp
        })

        await model.save()
    }
}

module.exports = ActivityRepository