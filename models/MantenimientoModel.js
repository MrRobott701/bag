import db from "./db/db.js";
import { DataTypes } from "sequelize";

const MantenimientoModel = db.define("mantenimiento", {
    
    idVehiculo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    UltCambio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ProxCambio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: false, 
});

export default MantenimientoModel;