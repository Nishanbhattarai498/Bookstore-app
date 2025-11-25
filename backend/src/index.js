import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import { connect } from 'mongoose';
import { connectDB } from './lib/db.js';

dotenv.config();


const app = express();
const PORT  = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use("/api/auth",authRoutes);
app.use("/api/books",bookRoutes); // Placeholder for book routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});