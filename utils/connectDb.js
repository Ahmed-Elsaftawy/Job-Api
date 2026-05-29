import mongoose from "mongoose"
import { log } from "console"

const connectDb = async (url) => {
    await mongoose.connect(url).then(() => {
            log('Database is connected');

    })
}

export { connectDb };