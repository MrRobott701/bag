// controllers/UsuarioController.js
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Obtener el secreto de JWT desde las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    // Desestructuramos todos los campos necesarios, incluyendo permisos
    const { 
        nombre, 
        correo, 
        password,
        inicio,
        propietarios,
        conductores,
        vehiculos,
        contratos,
        cobros,
        mecanica,
        usuarios
    } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await UserModel.findOne({ where: { correo } });
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Crear nuevo usuario (la contraseña será hasheada por el hook)
        const newUser = await UserModel.create({ 
            nombre, 
            correo, 
            password, 
            inicio,
            propietarios,
            conductores,
            vehiculos,
            contratos,
            cobros,
            mecanica,
            usuarios
        });

        // Respuesta exitosa
        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        // Error en la creación del usuario
        res.status(500).json({ message: 'Error creando el usuario', error: error.message });
    }
};


// Iniciar sesión de usuario
export const loginUser = async (req, res) => {
    const { correo, password } = req.body;
    try {
        // Encontrar el usuario por correo
        const user = await UserModel.findOne({ where: { correo } });
        if (!user) {
            return res.status(400).json({ message: "Correo o Contraseña Incorrectos" });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Correo o Contraseña Incorrectos" });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: user.id, correo: user.correo },
            JWT_SECRET,
            { expiresIn: '4h' }
        );

        // Preparar datos del usuario para la respuesta (excluyendo la contraseña)
        const userData = {
            id: user.id,
            nombre: user.nombre, // Asegúrate de que el modelo tenga este campo
            correo: user.correo,
            inicio: user.inicio,
            propietarios: user.propietarios,
            conductores: user.conductores,
            vehiculos: user.vehiculos,
            contratos: user.contratos,
            cobros: user.cobros,
            mecanica: user.mecanica,
            usuarios: user.usuarios,
            // Añade otros campos que consideres necesarios
        };

        res.status(200).json({ token, user: userData });
    } catch (error) {
        res.status(500).json({ message: 'Error iniciando sesión', error: error.message });
    }
};


// Listar todos los registros (Protegida)
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error obteniendo usuarios',
            error: error.message
        });
    }
};

// Obtener usuario por ID (Protegida)
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Error obteniendo usuario',
            error: error.message
        });
    }
};


// Actualizar Usuario
export const updateUser = async (req, res) => {
    try {
      // Obtener el ID del usuario desde los parámetros de la URL
      const { id } = req.params;
  
      // Extraer datos enviados en el cuerpo de la solicitud
      const {
        nombre,
        correo,
        password, // Nueva contraseña (opcional)
        inicio,
        propietarios,
        conductores,
        vehiculos,
        contratos,
        cobros,
        mecanica,
        usuarios,
      } = req.body;
  
      // Verificar si el usuario existe
      const user = await UserModel.findByPk(id); // Buscar por clave primaria
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      // Crear el objeto para actualizar
      const updates = {
        nombre,
        correo,
        inicio,
        propietarios,
        conductores,
        vehiculos,
        contratos,
        cobros,
        mecanica,
        usuarios,
      };
  
      // Si se proporciona una nueva contraseña, encriptarla
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(password, salt);
      }
  
      // Actualizar el usuario en la base de datos
      await UserModel.update(updates, { where: { id } });
  
      // Responder con éxito
      res.status(200).json({ message: 'Usuario actualizado correctamente.' });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  };



// Eliminar usuario por ID (Protegida)
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.destroy();
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({
            message: 'Error eliminando usuario',
            error: error.message
        });
    }
};
