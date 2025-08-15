import mongoose from "mongoose";
type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected to Db");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("dbConnected Successfully");
  } catch (error) {
  console.error("database connection failed", error);
  // In Next.js runtime, avoid exiting the process; rethrow to let caller handle
  throw new Error("Database connection failed");
  }
}
export default dbConnect