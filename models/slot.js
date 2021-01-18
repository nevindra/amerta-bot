const mongoose = require('mongoose')

const slotSchema = mongoose.Schema({
    name: {
        type: String,
    },
    slots: {
        type: Number
    }
})
const Slot = mongoose.model('slot',slotSchema)

module.exports = Slot