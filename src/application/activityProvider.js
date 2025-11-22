// This waits for API calls to return filtered data
class ActivityProvider {
    
    // An ActivityRepository in the constructor to query the DB
    constructor(activityRepository) {
        this.activityRepository = activityRepository
    }
    
    // Waits for query parameters to filter with, default for page is 1 and limit is 10.
    // This is in order to reduce memory usage, response time and amount of documents sent back
    // Ex: Document is ~1 KB, 100,000 docs = 100 MB sent in one request
    async getActivities({ userId, eventType, page = 1, limit = 10 }) {
        const filter = {}

        // Makes sure there's a userId and eventType before querying for them
        if(userId) filter.userId = parseInt(userId)
        if(eventType) filter.eventType = eventType

        const offset = (page - 1) * limit
        return await this.activityRepository.getLogs(filter, { offset, limit })
    }
}

module.exports = ActivityProvider