class Activity {
    constructor(userId, eventType, payload) {
        this.userId =  userId;
        this.eventType = eventType;
        this.payload = payload;
        this.processedAt;
    }
}