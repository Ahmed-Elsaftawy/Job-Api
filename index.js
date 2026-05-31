import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDb } from "./utils/connectDb.js";
import { log } from "console";
import { router } from "./routes/job-route.js";
import { userRouter } from "./routes/user-route.js";
config();
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/job', router);
app.use('/api/user', userRouter)


app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.status || "Error", message: error.message });
})

const port = process.env.PORT;

const start = async () => {
    await connectDb(process.env.MONOGDB_URI)
    app.listen(port, () => {
        log(`listen from ${port}`)
    })
}

start();

export default app;