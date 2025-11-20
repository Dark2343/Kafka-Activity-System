const express = require('express')
const app = express()
const connectDb = require('../../config/mongo')
const ActivityProvider = require('../../application/activityProvider')
const ActivityRepository = require('../mongoDB/repositories/activityRepository')
require('dotenv').config({ path: '../../config/.env'});

app.use(express.json())
const activityProvider = new ActivityProvider(new ActivityRepository())

app.get('/activities', async (req, res) => {
    try{
        const { page, limit } = req.query
        const activities = await activityProvider.getAllActivities({ page, limit })
        res.status(200).json(activities)
    } catch(e) {
        res.status(404).json({ error: e.message })
    }
})

app.get('/activities/user/:userId', async (req, res) => {
    try{
        const { page, limit } = req.query
        const userActivities = await activityProvider.getUserLogs(req.params.userId, { page, limit })
        res.status(200).json(userActivities)
    } catch(e) {
        res.status(404).json({ error: e.message })
    }
})

app.get('/activities/event/:eventType', async (req, res) => {
    try{
        const { page, limit } = req.query
        const eventActivities = await activityProvider.getEventLogs(req.params.eventType, { page, limit })
        res.status(200).json(eventActivities)
    } catch(e) {
        res.status(404).json({ error: e })
    }
})

app.listen(5000, async () => {
    await connectDb()
    console.log(`Server running on http://localhost:5000`);
});