// Our main Activity class that defines what an activity even is
class Activity {
    constructor({ userId, eventType, timestamp }) {
        if(!userId || !eventType || !timestamp){
            throw new Error("Missing activity data")
        }
        this.userId =  userId;
        this.eventType = eventType;
        this.timestamp = timestamp;
    }
}

module.exports = Activity