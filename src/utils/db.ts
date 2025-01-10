import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) return null;

    const client = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // const client = await MongoClient.connect(process.env.MONGODB_URI!, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
