const Activity = require('../domain/Activity')

class ActivityProcessor {
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }

    async processActivity(activityRaw) {
        const activityData = JSON.parse(activityRaw)
        const activity = new Activity({ userId: activityData.userId, eventType: activityData.eventType, timestamp: activityData.timestamp})
        await this.activityRepository.save(activity)
    }
}

module.exports = ActivityProcessor