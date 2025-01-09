// routes/musicsRouter.js

import express from 'express';
import { getAllMusics, getMusicById, createMusic, updateMusic, deleteMusic } from '../controllers/musicsController.js';

export const musicsRouter = express.Router();

// Afficher toutes les musiques
musicsRouter.get('/', getAllMusics);

// Afficher une musique par ID
musicsRouter.get('/:id', getMusicById);

// Ajouter une nouvelle musique
musicsRouter.post('/', createMusic);

// Mettre à jour une musique
musicsRouter.put('/:id', updateMusic);

// Supprimer une musique
musicsRouter.delete('/:id', deleteMusic);

