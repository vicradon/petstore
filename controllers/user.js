const Joi = require("joi");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

class UserController {
  async login(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(30).required(),
    });
    try {
      const { email, password } = await schema.validateAsync({
        email: req.body.email,
        password: req.body.password,
      });
      const user = await User.findOne({ where: { email } });
      const passwordIsCorrect = User.passwordIsCorrect(user, password);

      if (!passwordIsCorrect) {
        return res.status(400).json({
          status: "error",
          message: "email or password is incorrect",
        });
      }

      const jwtValue = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        token: jwtValue,
        status: "success",
        message: "logged in successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, status: "error" });
    }
  }
}

module.exports = new UserController();
