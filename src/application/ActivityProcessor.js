const Activity = require('../../domain/Activity')

class ActivityProcessor {
    constructor() {}
    processActivity(activityRaw) {
        const activityData = JSON.parse(activityRaw)
        const activity = new Activity(activityData.userId, activityData.eventType, activityData.timestamp)
    }
}

module.exports = ActivityProcessor