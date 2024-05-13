import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URI);
    console.log(`Mongo DB connected to server ${data.connection.host}`);
  } catch (error) {
    console.error("error while connecting to mongodb:", error);
  }
};

export default connectDatabase;
