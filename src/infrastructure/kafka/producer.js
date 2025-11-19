const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'activity-producer', // Name of my app
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

const run = async () => {
    await producer.connect()
    await producer.send({
        topic: 'user-activity',
        messages: [
            {value: JSON.stringify({
                userId: '123',
                eventType: 'login',
                timestamp: new Date().toISOString()
            })}
        ]
    })
    
    await producer.disconnect()
}

run()