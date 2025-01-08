import express from 'express';
import {
    getAllUsers,
    getUserByID,
    createUser,
    deleteUserByID,
    updateUserByID
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserByID);
router.post('/users', createUser);
router.delete('/users/:id', deleteUserByID);
router.put('/users/:id', updateUserByID);

export default router;

