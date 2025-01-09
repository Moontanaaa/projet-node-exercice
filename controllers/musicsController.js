

import { musics } from '../data/musics.js';

// Afficher toutes les musiques
export const getAllMusics = (req, res) => {
    res.status(200).json(musics);
};

// Afficher une musique par ID
export const getMusicById = (req, res) => {
    const { id } = req.params;
    const musicById = musics.find(music => music.id === parseInt(id));
    if (!musicById) {
        return res.status(404).json({ message: 'Music not found' });
    }
    return res.status(200).json(musicById);
};

// Ajouter une nouvelle musique
export const createMusic = (req, res) => {
    const { name, author, genre } = req.body;
    if (!name || !author || !genre) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newMusic = {
        id: musics.length + 1,
        name,
        author,
        genre,
    };
    musics.push(newMusic);
    return res.status(201).json(newMusic);
};

// Mettre à jour une musique
export const updateMusic = (req, res) => {
    const { id } = req.params;
    const { name, author, genre } = req.body;
    const musicIndex = musics.findIndex(music => music.id === parseInt(id));
    if (musicIndex === -1) {
        return res.status(404).json({ message: 'Music not found' });
    }
    if (!name || !author || !genre) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    musics[musicIndex] = { id: musics[musicIndex].id, name, author, genre };
    return res.status(200).json(musics[musicIndex]);
};

// Supprimer une musique
export const deleteMusic = (req, res) => {
    const { id } = req.params;
    const musicIndex = musics.findIndex(music => music.id === parseInt(id));
    if (musicIndex === -1) {
        return res.status(404).json({ message: 'Music not found' });
    }
    musics.splice(musicIndex, 1);
    return res.status(200).json({ message: 'Music deleted successfully' });
};
