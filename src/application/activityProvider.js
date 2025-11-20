class ActivityProvider {
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }

    async getAllActivities({ page = 1, limit = 10 }) {
        const offset = (page - 1) * limit
        return await this.activityRepository.getAllLogs({ offset, limit })
    }
    
    async getUserLogs(userId, { page = 1, limit = 10 }) {
        const offset = (page - 1) * limit
        return await this.activityRepository.getLogsByUser(userId, { offset, limit })
    }
    
    async getEventLogs(eventType, { page = 1, limit = 10 }) {
        const offset = (page - 1) * limit
        return await this.activityRepository.getLogsByEventType(eventType, { offset, limit })
    }
}

module.exports = ActivityProvider