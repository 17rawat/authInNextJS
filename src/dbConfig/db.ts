import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("MongoDB connection established");
    });

    db.on("disconnected", () => {
      console.log("MongoDB connection disconnected");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect;
