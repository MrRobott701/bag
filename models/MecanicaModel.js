import db from "./db/db.js";
import { DataTypes } from "sequelize";

const MecanicaModel = db.define("mecanicas", {
    idVehiculo:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    UltCambio:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ProxCambio:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false, 
});

export default MecanicaModel;
