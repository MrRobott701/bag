// app.js
import express from 'express';
import cors from 'cors';
import db from './models/db/db.js';
import propietariosRoutes from './routes/propietarios.js';
import conductoresRoutes from './routes/conductores.js';
import vehiculosRoutes from './routes/vehiculos.js';
import contratosRoutes from './routes/contratos.js';
import cobrosRoutes from './routes/cobros.js';
import usuariosRoutes from './routes/usuarios.js';
import mecanicaRoutes from './routes/mecanicas.js';
import dotenv from 'dotenv';
import {PORT} from './src/config.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'https://allgates.vercel.app', // Reemplaza con la URL de tu frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.json());

// Rutas
app.use('/propietarios', propietariosRoutes);
app.use('/conductores', conductoresRoutes);
app.use('/vehiculos', vehiculosRoutes);
app.use('/contratos', contratosRoutes);
app.use('/cobros', cobrosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/mecanicas', mecanicaRoutes);


// Conexión a la base de datos
const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Conectado a la base de datos');

        app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000');
        });
    } catch (error) {
        console.log('Error de conexión', error);
    }
};

startServer();
