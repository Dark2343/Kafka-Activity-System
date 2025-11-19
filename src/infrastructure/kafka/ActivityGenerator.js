const Activity = require('../../domain/Activity')

class ActivityGenerator {
    constructor() {}

    generateNewActivity(){
        const EVENTS = ['login', 'logout', 'signup', 'purchase', 'view', 'favorite-item']

        const getRandomInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const activity = new Activity({
            userId: getRandomInteger(1, 1000),
            eventType: EVENTS[getRandomInteger(0, EVENTS.length - 1)],
            timestamp: new Date().toISOString()
        })
        return activity
    }
}

module.exports = ActivityGenerator