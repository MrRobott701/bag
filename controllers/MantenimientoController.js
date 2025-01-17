import MantenimientoModel from '../models/MantenimientoModel.js';
import { Op } from 'sequelize'; // Asegúrate de importar Op

//Mostrar todos los registros
export const getAllMantenimiento = async (req, res) => {
    try{
        const mantenimiento = await MantenimientoModel.findAll();
        res.status(200).json(mantenimiento);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

//Mostrar un registro
export const getMantenimiento = async (req, res) => {
    try{
        const mantenimiento = await MantenimientoModel.findByPk(req.params.id);
        if(!mantenimiento){
            return res.status(404).json({message: "Mantenimiento no encontrado"});
        }
        res.status(200).json(mantenimiento);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

//Crear un registro
export const createMantenimiento = async (req, res) => {
    try{
        const mantenimiento = await MantenimientoModel.create(req.body);
        res.status(201).json(mantenimiento);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

//Actualizar un registro
export const updateMantenimiento = async (req, res) => {
    try{
        const mantenimiento = await MantenimientoModel.findByPk(req.params.id);
        if(!mantenimiento){
            return res.status(404).json({message: "Mantenimiento no encontrado"});
        }
        await mantenimiento.update(req.body);
        res.status(200).json(mantenimiento);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

//Eliminar un registro
export const deleteMantenimiento = async (req, res) => {
    try{
        const mantenimiento = await MantenimientoModel.findByPk(req.params.id);
        if(!mantenimiento){
            return res.status(404).json({message: "Mantenimiento no encontrado"});
        }
        await mantenimiento.destroy();
        res.status(200).json(mantenimiento);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}