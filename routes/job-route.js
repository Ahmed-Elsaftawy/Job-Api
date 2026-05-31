import express from "express";
import { createjob, deletjob, getAlljobs, getjob, updatejob } from "../controllers/job-controller.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route('/')
    .get(getAlljobs)
    .post(verifyToken, verifyRole('admin', 'manager'), createjob);
router.route('/:jobId')
    .get(getjob)
    .delete(verifyToken, verifyRole('admin', 'manager'), deletjob)
    .patch(verifyToken, verifyRole('admin', 'manager'), updatejob);

export { router };