require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/house_rental',
  jwtSecret: process.env.JWT_SECRET || 'house_rental_secret_key_2024',
  jwtExpiresIn: '7d',
};
