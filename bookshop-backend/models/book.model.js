module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      stock: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      coverImage: DataTypes.STRING
    });
    return Book;
  };
  