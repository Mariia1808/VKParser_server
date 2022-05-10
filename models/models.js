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
    itog: {type: DataTypes.STRING, allowNull: false},
    zapros: {type: DataTypes.STRING, allowNull: false},

})

User.hasMany(History)
History.belongsTo(User)

module.exports = {
    User,
    History
}