const Activity = require('../../domain/activity')

// This class is basically a simulator for user activities to be sent by the producer
// It acts as a real user
class ActivityGenerator {
    constructor() {}

    // Responsible for generating activities
    generateNewActivity(){

        // Random list of events to choose from
        const EVENTS = ['login', 'logout', 'signup', 'purchase', 'view', 'favorite-item']

        // RNG to choose a random userId and event with
        const getRandomInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const activity = new Activity({
            userId: getRandomInteger(1, 1000),  // UserID between 1-1000
            eventType: EVENTS[getRandomInteger(0, EVENTS.length - 1)],  // Random event from our list
            timestamp: new Date().toISOString() // Current data in ISO format  
            // (2025-11-20T10:36:18.914+00:00) -- (YYYY-MM-DDTHH:mm:ss.sssZ) -- T is start of time, Z is timezone 
        })
        return activity
    }
}

module.exports = ActivityGenerator