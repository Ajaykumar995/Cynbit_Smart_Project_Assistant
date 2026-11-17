import mongoose from 'mongoose';

// Disable buffering so queries fail fast and trigger memory fallback instead of hanging for 10s
mongoose.set('bufferCommands', false);

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cynbit_assistant';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    console.warn('[MongoDB] Check MONGODB_URI in Render/local .env and ensure Atlas IP 0.0.0.0/0 is whitelisted.');
    // Schedule background retry
    setTimeout(() => {
      console.log('[MongoDB] Retrying connection...');
      connectDB().catch(() => {});
    }, 15000);
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Connection lost. Reconnection will be attempted...');
});

mongoose.connection.on('reconnected', () => {
  console.log('[MongoDB] Connection re-established.');
});
