const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    stock: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    coverImage: DataTypes.STRING
  });
  return Book;
};
