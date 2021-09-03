const { DataTypes } = require('sequelize');
const db = require('../database');

const Usuarios = db.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = Usuarios;