import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { musicsRouter } from './routes/musicsRouter.js'; 
import postsRouter from './routes/postRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoDB = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);    // Routes pour les utilisateurs
app.use('/api/posts', postsRouter);   // Routes pour les posts
app.use('/api/musics', musicsRouter); // Routes pour les musiques

mongoose.connect(mongoDB)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});





