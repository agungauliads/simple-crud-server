'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be null",
        },
        notEmpty: {
          msg: "Name cannot be empty"
        }
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "color cannot be null",
        },
        notEmpty: {
          msg: "color cannot be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "price cannot be empty",
        },
        notNull: {
          msg: "price cannot be null",
        },
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image Url cannot be empty",
        },
        notNull: {
          msg: "Image Url cannot be null",
        },
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "userId cannot be empty",
        },
        notNull: {
          msg: "userId cannot be null",
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};