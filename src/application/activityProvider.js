class ActivityProvider {
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }

    async getActivities({ userId, eventType, page = 1, limit = 10 }) {
        const filter = {}

        if(userId) filter.userId = parseInt(userId)
        if(eventType) filter.eventType = eventType

        const offset = (page - 1) * limit
        return await this.activityRepository.getLogs(filter, { offset, limit })
    }
}

module.exports = ActivityProvider