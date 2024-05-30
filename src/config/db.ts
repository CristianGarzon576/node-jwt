import mongoose from 'mongoose';

const connectDB = async () => {
    if (!process.env.USE_MONGO) {
        console.log('no hay bd')
        return;
    }
    try {
        await mongoose.connect('mongodb://localhost:27017/myapp', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error conectando a la base de datos', err);
        process.exit(1);
    }
};

export default connectDB;
