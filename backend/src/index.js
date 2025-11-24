import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();


const app = express();
const PORT  = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});