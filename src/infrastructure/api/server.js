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
        const { userId, eventType, page, limit } = req.query
        const activities = await activityProvider.getActivities({ userId, eventType, page, limit })
        res.status(200).json(activities)
    } catch(e) {
        res.status(404).json({ error: e.message })
    }
})


app.listen(5000, async () => {
    await connectDb()
    console.log(`Server running on http://localhost:5000`);
});