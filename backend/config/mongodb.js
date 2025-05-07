
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable not set");
        }

        console.log("Connecting to MongoDB...");
        mongoose.connection.on('connected', () => console.log("Database connected"));
        mongoose.connection.on('disconnected', () => console.log("Database disconnected"));
        mongoose.connection.on('reconnected', () => console.log("Database reconnected"));
        mongoose.connection.on('error', (err) => console.error("Database connection error:", err));

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'project',
            retryWrites: true,
            w: 'majority'
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB
