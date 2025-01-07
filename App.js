import express from 'express';
import { musics } from './data/musics.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send(`Welcome to my API`);
});

app.get('/musics', (req, res) => {
    res.json(musics);
});

app.get('/musics/:id', (req, res) => {
    let { id } = req.params
    try {
        const musicById = musics.find(music => music.id === parseInt(id))
        if (!musicById) {
            return res.status(403).json({message : "music not found"})
        }
        return res.status(200).json(musicById)
    }
    catch(err){
        return res.status(500).json({message : "internal server error"})
    }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
