// Our MongoDB Activity schema 
const mongoose = require('mongoose')

// Same structure as the Activity class
const activitySchema = new mongoose.Schema({
    userId: Number,
    eventType: String,
    timestamp: Date
})

// We index it so read operations can be faster when querying for these fields
// Index userId, and eventType for filtering queries
// Index timestamps for sorting in descending order (newer activities first)
activitySchema.index({ userId: 1 })
activitySchema.index({ eventType: 1 })
activitySchema.index({ timestamp: -1 })

// Create the model in the DB
const ActivityModel = mongoose.model('activity', activitySchema);
module.exports = ActivityModel