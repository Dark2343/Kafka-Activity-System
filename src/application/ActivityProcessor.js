const Activity = require('../domain/activity')

// It basically just receives the activity from consumer, then it:
// - Process the raw data to JSON
// - Creates and Activity object with this data
// - Saves it in the repo using the provided ActivityRepository in the constructor
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