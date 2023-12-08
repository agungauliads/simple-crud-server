const { User } = require("../../models/index");
const { compareHashPassword } = require("../../helper/bcrypt");
const { signPayloadToToken } = require("../../helper/jwt");

class indexController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const data = await User.create({
        username,
        email,
        password,
        role: "guest",
        phoneNumber,
        address,
      });
      res.status(201).json(data);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => {
          return el.message;
        });
        res.status(400).json({ message: error });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      let data = await User.findOne({
        where: {
          email,
        },
      });
      if (!data) {
        throw { name: "Not Login" };
      }
      const isData = compareHashPassword(password, data.password);
      // console.log(isData);
      if (!email) {
        throw { name: "Invalid Email/Password" };
      }
      if (!password) {
        throw { name: "Invalid Email/Password" };
      }
      if (!isData) {
        throw { name: "Invalid Email/Password" };
      }
      const payload = {
        id: data.id,
      };
      const token = signPayloadToToken(payload);
      if (!token) {
        throw { name: "JsonWebTokenError" };
      }
      res.status(200).json({
        access_token: token,
        name: data.username,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = indexController;
