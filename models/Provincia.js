const { DataTypes } = require('sequelize');
const db = require('../database');

const Provincia = db.define('provincia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
});

module.exports = Provincia;