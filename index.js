import express from "express";
import { config } from "dotenv";
import { connectDb } from "./utils/connectDb.js";
import { log } from "console";
import { router } from "./routes/job-route.js";
config();
const app = express();

app.use(express.json());
app.use('/api/jobs', router);



app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ status: "ERROR", message: error.message });
})

const port = process.env.PORT;

const start = () => {
    connectDb(process.env.MONOGDB_URI)
    app.listen(port, () => {
        log(`listen from ${port}`)
    })
}

start();