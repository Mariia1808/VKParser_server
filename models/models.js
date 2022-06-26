const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { types } = require('pg')

const User = sequelize.define('users',{
    ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, allowNull: false},
    user_id: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
})

const History = sequelize.define('history',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    itog: {type: DataTypes.STRING({length: 10485760}), allowNull: false},
    zapros: {type: DataTypes.STRING({length: 10485760}), allowNull: false},
})

const Methods = sequelize.define('methods',{
    ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    method: {type: DataTypes.STRING, allowNull: false},
})

const Parameter = sequelize.define('parameter',{
    ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    parameters: {type: DataTypes.STRING({length: 10485760}), allowNull: false},
})

User.hasMany(History, {onDelete: 'cascade'})
History.belongsTo(User)

Methods.hasMany(Parameter, {onDelete: 'cascade'})
Parameter.belongsTo(Methods)

History.hasOne(Parameter, {onDelete: 'cascade'})
Parameter.belongsTo(History)

module.exports = {
    User,
    History,
    Methods,
    Parameter
}