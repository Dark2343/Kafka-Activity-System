// Our producer, responsible for sending activities to Kafka broker to store in a topic (message group)

const { Kafka } = require('kafkajs')
const ActivityGenerator = require('./activityGenerator')

// Creates a Kafka object to listen to
const kafka = new Kafka({
    clientId: 'activity-producer', // Name of the app
    brokers: ['kafka-service:9092'] // Our Kafka docker compose container name with the port we defined it on
})

// This creates a producer object that starts sending activities 
const producer = kafka.producer()
// Creates an ActivityGenerator that can send random events
const activityGenerator = new ActivityGenerator()

// Start producing messages
const produceMessages = async () => {
    // Connect to Kafka broker cluster
    await producer.connect()

    // Send an event every 3 seconds
    setInterval(async () => {
        // Create and get a random activity
        const activity = activityGenerator.generateNewActivity()
        try{
            // Send it to a topic names 'user-activity'
            await producer.send({
                topic: 'user-activity',
                // Converts the activity into a JSON string '{"userId":123,"type":"login","timestamp":"2025-11-22T12:00:00Z"}'
                messages: [
                    {value: JSON.stringify(activity)}
                ]
            })
            console.log("Message sent successfully")
        }
        catch(e) {
            console.error("ERROR: ", e)
        }
    }, 3000)    // Does this every 3000ms (3 seconds)
}

produceMessages()