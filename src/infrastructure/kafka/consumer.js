const { Kafka } = require('kafkajs')
const ActivityProcessor = require('../../application/activityProcessor')
const ActivityRepository = require('../mongoDB/repositories/activityRepository')
const connectDB = require('../../config/mongo')
require('dotenv').config({ path: '../../config/.env'});

const kafka = new Kafka({
    clientId: 'activity-producer', // Name of my app
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'user-activity-consumers'})

const consumeMessages = async () => {
    await connectDB()
    
    const activityProcessor = new ActivityProcessor(new ActivityRepository())

    await consumer.connect()
    await consumer.subscribe({topic: 'user-activity'})

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            try{
                const rawData = message.value.toString()
                activityProcessor.processActivity(rawData)      // Send it to get parsed and saved
                console.log("Activity saved to MongoDB")
            }
            catch(e){
                console.error("Error consuming activity: ", e)
            }
        }
    })
}

consumeMessages()