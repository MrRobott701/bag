import MecanicaModel from "../models/MecanicaModel.js";
import { Op } from "sequelize";

// Mostrar todos los registros
export const getAllMecanica = async (req, res) => {
    try {
        const mecanicas = await MecanicaModel.findAll();
        res.status(200).json(mecanicas);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

// Mostrar un registro
export const getMecanica = async (req, res) => {
    try {
        const mecanicas = await MecanicaModel.findByPk(req.params.id);
        if (!mecanicas) {
            return res.status(404).json({ message: "Mecanica no encontrado" });
        }
        res.status(200).json(mecanicas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un registro
export const createMecanica = async (req, res) => {
    console.log(req.body);
    console.log("Creando mecanicas");

    try {
        const newMecanica = await MecanicaModel.create(req.body);
        res.status(201).json({ message: "Registro creado", mecanicas: newMecanica });
        console.log("Mecanica creado");
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
        console.log("Error al crear mecanicas");
    }
};

// Actualizar un registro
export const updateMecanica = async (req, res) => {
    try {
        const mecanicas = await MecanicaModel.findByPk(req.params.id);
        if (!mecanicas) {
            return res.status(404).json({ message: "Mecanica no encontrado" });
        }
        await mecanicas.update(req.body);
        res.status(200).json({ message: "Registro actualizado", mecanicas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro
export const deleteMecanica = async (req, res) => {
    try {
        const mecanicas = await MecanicaModel.findByPk(req.params.id);
        if (!mecanicas) {
            return res.status(404).json({ message: "Mecanica no encontrado" });
        }
        await mecanicas.update({ activo: 0 });
        res.status(200).json({ message: "Registro eliminado", mecanicas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};