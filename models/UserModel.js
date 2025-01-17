// models/UserModel.js
import db from "./db/db.js";
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

const UsuarioModel = db.define("users", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inicio:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    propietarios:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    conductores:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vehiculos:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contratos:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cobros:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mecanica:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    usuarios:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    // Desactiva la columna de sequelize
    timestamps: false, 
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    },
});

export default UsuarioModel;
