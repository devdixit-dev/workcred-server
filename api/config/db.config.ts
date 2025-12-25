import 'dotenv/config';
import mongoose from "mongoose";

const connectDatabase = async () => {
  try{
    await mongoose.connect(String(process.env.DB_URL), { dbName: process.env.DB_NAME })
    .then(() => {console.log(`Database connected`)})
    .catch((e) => {console.error(`Database connection error: ${e}`)});
  }
  catch(error) {
    console.error(`Error connecting database: ${error}`);
    process.exit(1);
  }
}

export default connectDatabase;