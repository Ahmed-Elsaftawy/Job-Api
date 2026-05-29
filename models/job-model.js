import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true,"company can not be empty"]
    },
    position: {
        type: String,
        required: [true,"position can not be empty"]
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
    }
})

const jobModel = mongoose.model('job', jobSchema);
export { jobModel }