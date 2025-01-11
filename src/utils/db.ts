import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) return null;

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
