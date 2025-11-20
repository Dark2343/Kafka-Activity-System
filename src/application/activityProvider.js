class ActivityProvider {
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }

    async getAllActivities() {
        return await this.activityRepository.getAllLogs()
    }

    async getUserLogs(userId) {
        return await this.activityRepository.getLogsByUser(userId)
    }

    async getEventLogs(eventType) {
        return await this.activityRepository.getLogsByEventType(eventType)
    }
}

module.exports = ActivityProvider