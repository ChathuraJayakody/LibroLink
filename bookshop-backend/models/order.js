module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      status: {
        type: DataTypes.STRING,
        defaultValue: 'new'
      },
      total: DataTypes.DECIMAL(10, 2)
    });
    return Order;
  };
  