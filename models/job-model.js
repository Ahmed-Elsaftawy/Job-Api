import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
    }
})

const jobModel = mongoose.model('job', jobSchema);
export { jobModel }