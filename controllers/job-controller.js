import { jobModel } from '../models/job-model.js';
import { asyncWrapper } from '../middlewares/asyncWrapper.js';
import { AppError } from '../utils/appError.js';
import { log } from "console"
//CRUD


const createjob = asyncWrapper(async (req, res, next) => {
    if (!req.body['company']) {
        return next(new AppError('company is required', "Failed", 400));
    }
    if (!req.body['position']) {
        return next(new AppError('position is required', "Failed", 400));
    }
    const job = new jobModel(req.body);
    await job.save();
    res.status(200).json({ status: 'success', data: job });
});


//Read all jobs
const getAlljobs = asyncWrapper(async (req, res) => {
    const jobs = await jobModel.find({}, { __v: false });
    res.status(200).json({ status: "Success", data: jobs });
})


const getjob = asyncWrapper(async (req, res, next) => {
    const jobId = req.params.jobId;

    const job = await jobModel.findOne({ _id: jobId }, { __v: false });
    if (!job) {
        return next(new AppError('Not Found Job', "Failed", 400));
    }
    res.status(200).json({ status: "Success", data: job });
})

const updatejob = asyncWrapper(async (req, res, next) => {
    const jobId = req.params.jobId;
    const job = await jobModel.findOneAndUpdate({ _id: jobId }, { $set: req.body }, {
        new: true,
        runValidators: true
    });
    if (!job) {
        return next(new AppError("Not Found Job", "Field", 400));
    }

    res.status(200).json({ status: "Success", data: job });
})
const deletjob = asyncWrapper(async (req, res, next) => {
    const jobId = req.params.jobId;
    const job = await jobModel.findOneAndDelete({ _id: jobId });
    if (!job) {
        return next(new AppError("Not Found Job", "Field", 400));
    }
    res.status(200).json({ status: "Success", message: "The Job Is Deleted Succesfully" });
})


export { getAlljobs, getjob, createjob, updatejob, deletjob };