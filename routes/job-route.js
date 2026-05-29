import express from "express";
import { createjob, deletjob, getAlljobs, getjob, updatejob } from "../controllers/job-controller.js";

const router = express.Router();

router.route('/')
    .get(getAlljobs)
    .post(createjob);
router.route('/:jobId')
    .get(getjob)
    .delete(deletjob)
    .patch(updatejob);

export { router };