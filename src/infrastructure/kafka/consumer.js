const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'activity-producer', // Name of my app
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'user-activity-consumers'})

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({topic: 'user-activity', fromBeginning: true})

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log({
                value: message.value.toString()
            })
        }
    })
}

run()