'use strict';
const {
  Model
} = require('sequelize');
const { createHashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username cannot be null",
        },
        notEmpty: {
          msg: "Username cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email is not available",
      },
      validate: {
        notEmpty: {
          msg: "Email cannot be empty",
        },
        notNull: {
          msg: "Email cannot be null",
        },
        isEmail: {
          msg: "Must use Email Format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be null",
        },
        notEmpty: {
          msg: "Password cannot be empty"
        },
        min: {
          args: 5,
          msg: "Minimum password length is 5",
        },
      },
    },
    role: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone Number cannot be null",
        },
        notEmpty: {
          msg: "Phone Number cannot be empty"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address cannot be null",
        },
        notEmpty: {
          msg: "Address cannot be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (data) => {
        let hashPass = createHashPassword(data.password)
        data.password = hashPass;
      },
    },
  });
  return User;
};