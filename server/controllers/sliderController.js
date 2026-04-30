import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 🔥 MongoDB connect
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "alabraz", // optional (clean DB name)
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);

    // 🔥 exit app if DB fails
    process.exit(1);
  }
};

export default connectDB;