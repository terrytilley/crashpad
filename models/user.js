var Sequelize = require('sequelize');
var connection = require('../config/sequelize.js');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var User = connection.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true},
  firstName: {
    type: Sequelize.STRING,
    validate: {notEmpty: { msg: 'First name is required' }}},
  lastName: {
    type: Sequelize.STRING,
    validate: {notEmpty: { msg: 'Last name is required' }}},
  email: {
    type: Sequelize.STRING,
    unique: { msg: 'Email already registered' },
    validate: {isEmail: { msg: 'Invalid email.' }, notEmpty: { msg: 'The email is required' }}},
  passwordDigest: {
    type: Sequelize.STRING,
    validate: {notEmpty: true}
  }});

User.sync();
module.exports = User;

module.exports.createUser = function(newUser, callback) {
  bcrypt.hash(newUser.password, salt, function(err, hash) {
    newUser.password = hash;
    newUser.save(callback);
  });
};
