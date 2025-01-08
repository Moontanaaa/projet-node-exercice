import Users from '../models/Users.js';

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        if (users.length < 1) {
            return res.status(400).json({ message: 'Users not found' });
        }
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Récupérer un utilisateur par l' ID
export const getUserByID = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Créer un nouvel utilisateu
export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, passion } = req.body;
        const newUser = new Users({ first_name, last_name, passion });
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Supprimer un utilisateur par ID
export const deleteUserByID = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Mettre à jour un utilisateur par ID
export const updateUserByID = async (req, res) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

