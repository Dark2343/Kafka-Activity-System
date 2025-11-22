const express = require('express')
const app = express()
const connectDb = require('../../config/mongo')
const ActivityProvider = require('../../application/activityProvider')
const ActivityRepository = require('../mongoDB/repositories/activityRepository')
require('dotenv').config()  // This is to load our {MONGO_URI} from the .env file from project root

// To parse JSON files
app.use(express.json())
const activityProvider = new ActivityProvider(new ActivityRepository())

// Endpoint to get activities from
app.get('/activities', async (req, res) => {
    try{
        // Gets query parameters from request
        const { userId, eventType, page, limit } = req.query
        // Gets data from DB
        const activities = await activityProvider.getActivities({ userId, eventType, page, limit })
        // Sends them back in the response
        res.status(200).json(activities)
    } catch(e) {
        res.status(404).json({ error: e.message })
    }
})

// Just runs the server on port 5000
app.listen(5000, async () => {
    await connectDb()
    console.log(`Server running...`);
});