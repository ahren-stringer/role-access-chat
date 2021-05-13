import mongoose from 'mongoose'

const chanelSchema = mongoose.Schema({
    name: { type: String, require: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },

    canSee: { type: mongoose.Schema.Types.ObjectId, ref: "Right" },
    canWrite: { type: mongoose.Schema.Types.ObjectId, ref: "Right" },
    canSeeHistory: { type: mongoose.Schema.Types.ObjectId, ref: "Right" },
    canSendFile: { type: mongoose.Schema.Types.ObjectId, ref: "Right" },

    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
}, {
    timestamps: true
});

export default mongoose.model('Chanel', chanelSchema)