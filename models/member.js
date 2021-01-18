const mongoose = require('mongoose')

const registSchema = mongoose.Schema({
    full_name: {
        type: String,
    },
    contact_person: {
        type: String
    },
    face_claim: {
        type: String,
    },
    username: {
        type: String,
    },
    namaPekerjaan: {
        type: String,
        trim: true,
    },
    faksi: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
    imageURL: {
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
    statusUpdate: {
        type: Boolean,
        default: false
    }
})
const Profile = mongoose.model('member',registSchema)

module.exports = Profile