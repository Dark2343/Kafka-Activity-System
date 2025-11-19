const { Kafka } = require('kafkajs')
const Activity = require('../../domain/Activity')

const kafka = new Kafka({
    clientId: 'activity-producer', // Name of my app
    brokers: ['localhost:9092']
})

const EVENTS = ['login', 'logout', 'signup', 'purchase', 'view', 'favorite-item']

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random activity so we can have different data
function generateNewActivity() {
    const activity = new Activity({
        userId: getRandomInteger(1, 1000),
        eventType: EVENTS[getRandomInteger(0, EVENTS.length - 1)],
        timestamp: new Date().toISOString()
    })
    return activity
}

const producer = kafka.producer()

const run = async () => {
    await producer.connect()

    setInterval(async () => {
        const activity = generateNewActivity()
        try{
            await producer.send({
                topic: 'user-activity',
                messages: [
                    {value: JSON.stringify(activity)}
                ]
            })
            console.log("Message sent successfully")
        }
        catch(e) {
            console.error("ERROR: ", e)
        }
    }, 3000)    
}

run()