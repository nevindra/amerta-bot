const mongoose = require('mongoose')

const backupSchema = mongoose.Schema({
    full_name: {
        type: String,
    },
    username: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isHousing: {
        type: Boolean,
        default: false
    },
    houseType: {
        type: Number,
        default: 0
    },
    isPlotJob: {
        type: Boolean,
        default: false
    },
    isEventAttend: {
        type: Boolean,
        default: false
    },
    kekayaan: {
        type: Number,
        default: 100
    },

})
const Backup = mongoose.model('backup',backupSchema)

module.exports = Backup