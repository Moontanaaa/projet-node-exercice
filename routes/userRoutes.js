import express from 'express';
import {
    getAllUsers,
    getUserByID,
    createUser,
    deleteUserByID,
    updateUserByID
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.post('/users', createUser);
router.delete('/:id', deleteUserByID);
router.put('/:id', updateUserByID);

export default router;

