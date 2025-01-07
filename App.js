import express from 'express';
import { musics } from './data/musics.js';
import dotenv from 'dotenv';
import { musicsRouter } from './route/musicsRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/musics', musicsRouter);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
