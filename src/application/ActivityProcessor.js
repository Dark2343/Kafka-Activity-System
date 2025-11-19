const Activity = require('../../domain/Activity')

class ActivityProcessor {
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }

    async processActivity(activityRaw) {
        const activityData = JSON.parse(activityRaw)
        const activity = new Activity(activityData.userId, activityData.eventType, activityData.timestamp)
        await this.activityRepository.save(activity)
    }
}

module.exports = ActivityProcessor