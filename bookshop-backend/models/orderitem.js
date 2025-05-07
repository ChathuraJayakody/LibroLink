module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10, 2)
    });
    return OrderItem;
  };
  