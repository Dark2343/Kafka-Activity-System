// Our consumer, responsible for listening to Kafka broker for activities then processing them

const { Kafka } = require('kafkajs')
const ActivityProcessor = require('../../application/activityProcessor')
const ActivityRepository = require('../mongoDB/repositories/activityRepository')
const connectDB = require('../../config/mongo')
require('dotenv').config();

// Creates a Kafka object to listen to
const kafka = new Kafka({
    clientId: 'activity-producer', // Name of the app
    brokers: ['kafka-service:9092'] // Our Kafka docker compose container name with the port we defined it on
})

// This creates a consumer object that starts listening 
// We can give it a group id to have multiple consumers listening to the same topic and partition the work among them
const consumer = kafka.consumer({ groupId: 'user-activity-consumers'})

// Start consuming messages
const consumeMessages = async () => {
    // First connects to the DB so it can save activities
    await connectDB()
    
    // Then we make our Processor that we use to save the data
    const activityProcessor = new ActivityProcessor(new ActivityRepository())

    // Connect to Kafka broker cluster
    await consumer.connect()
    // Listen to a specific topic
    await consumer.subscribe({topic: 'user-activity'})

    await consumer.run({
        // Then for each message received we do something
        eachMessage: async ({topic, partition, message}) => {
            try{
                // Convert the raw data to a string
                const rawData = message.value.toString()
                // Send it to get parsed and saved
                activityProcessor.processActivity(rawData)
                console.log("Activity saved to MongoDB")
            }
            catch(e){
                console.error("Error consuming activity: ", e)
            }
        }
    })
}

consumeMessages()