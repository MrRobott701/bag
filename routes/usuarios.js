// routes/usuarios.js
import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUsers, 
    getUserById,  
    updateUser, 
    deleteUser 
} from '../controllers/UsuarioController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rutas protegidas (requieren autenticación)
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
