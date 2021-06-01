import mongoose from 'mongoose'

const fileSchema = mongoose.Schema({
    file: {type:Object},
    chat:{type: mongoose.Schema.Types.ObjectId,ref: 'Chanel', require:true},
}, {
    timestamps: true
});

export default mongoose.model('File', fileSchema)