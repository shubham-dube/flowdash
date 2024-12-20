import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) return; // Already connected

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Connected');
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed');
    }
};

export default connectDB;
