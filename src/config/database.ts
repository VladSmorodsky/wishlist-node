import mongoose from "mongoose";

export const dbConnect = async (dbUri: string): Promise<void> => {
    try {
        await mongoose.connect(dbUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

