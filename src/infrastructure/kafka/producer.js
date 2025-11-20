const { Kafka } = require('kafkajs')
const ActivityGenerator = require('./activityGenerator')

const kafka = new Kafka({
    clientId: 'activity-producer', // Name of my app
    brokers: ['kafka:9092']
})

const producer = kafka.producer()
const activityGenerator = new ActivityGenerator()

const produceMessages = async () => {
    await producer.connect()

    setInterval(async () => {
        const activity = activityGenerator.generateNewActivity()
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

produceMessages()