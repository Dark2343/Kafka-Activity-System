const { Kafka } = require('kafkajs')
const ActivityProcessor = require('../../application/ActivityProcessor')

const kafka = new Kafka({
    clientId: 'activity-producer', // Name of my app
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'user-activity-consumers'})
const activityProcessor = new ActivityProcessor()

const consumeMessages = async () => {
    await consumer.connect()
    await consumer.subscribe({topic: 'user-activity'})

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            try{
                const rawData = message.value.toString()
                activityProcessor.processActivity(rawData)          // Send it to get parsed and saved
            }
            catch(e){
                console.error("Error consuming activity: ", e)
            }
        }
    })
}

consumeMessages()