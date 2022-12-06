import mongoose from 'mongoose';
import config from 'config';
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongooseDB connected and you can see that too...');
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
