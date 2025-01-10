import mongoose from 'mongoose'
import { dbName } from '../constants.js'

export const dbConnect = async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
    } catch (error) {
        console.log(`Error while connecting to DB : ${error.message}`)
        process.exit(1)
    }
}