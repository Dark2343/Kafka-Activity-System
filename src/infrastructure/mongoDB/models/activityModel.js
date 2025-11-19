const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    userId: Number,
    eventType: String,
    timestamp: Date
})

activitySchema.index({ userId: 1 })
activitySchema.index({ eventType: 1 })
activitySchema.index({ timestamp: -1 })

const ActivityModel = mongoose.model('Event', activitySchema);
module.exports = ActivityModel