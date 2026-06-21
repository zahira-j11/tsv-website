import mongoose from 'mongoose';

// In Next.js dev, modules are reloaded — cache the connection on globalThis
// so we don't open a new pool every hot reload.
type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const globalForMongoose = globalThis as unknown as { mongoose?: MongooseCache };
const cached: MongooseCache = globalForMongoose.mongoose ?? { conn: null, promise: null };
if (!globalForMongoose.mongoose) globalForMongoose.mongoose = cached;

export async function connectDB() {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is not defined in the environment.');
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbUri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 28000,
      connectTimeoutMS: 28000,
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
