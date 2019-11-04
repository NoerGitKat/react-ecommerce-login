import mongoose from 'mongoose';
const connection = {};

async function connectDB() {
  try {
    // Check if there's already a connection
    if (connection.isConnected) {
      console.log('Using existing connection!');
      return;
    }
    // Only connect to DB if not active yet
    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('DB is connected!');
    // Connect to serverless application
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.log('Error at DB connection', err);
  }
}

export default connectDB;
