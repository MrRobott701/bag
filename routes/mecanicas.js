import express from 'express';
import { getAllMecanica, getMecanica, createMecanica, updateMecanica, deleteMecanica } from '../controllers/MecanicaController.js';

const router = express.Router();

router.get('/', getAllMecanica);
router.get('/:id', getMecanica);
router.post('/', createMecanica);
router.put('/:id', updateMecanica);
router.delete('/:id', deleteMecanica);

export default router;