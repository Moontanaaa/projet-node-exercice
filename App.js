import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { musicsRouter } from './routes/musicsRouter.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8000;
const mongoDB = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', musicsRouter);


mongoose.connect(mongoDB)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



