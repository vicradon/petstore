const Joi = require("joi");
const { User } = require("../models"); // Assuming you have a User model defined

class UserController {
  // POST /user/createWithArray
  async createWithArray(req, res) {
    const schema = Joi.array().items(
      Joi.object({
        id: Joi.number().integer().required(),
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        userStatus: Joi.number().integer().valid(0, 1).required(),
      })
    );

    try {
      const users = await schema.validateAsync(req.body);

      const createdUsers = await User.bulkCreate(users);

      return res.status(201).json(createdUsers);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Failed to create users: ${error.message}` });
    }
  }

  // POST /user/createWithList
  async createWithList(req, res) {
    const schema = Joi.array().items(
      Joi.object({
        id: Joi.number().integer().required(),
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        userStatus: Joi.number().integer().valid(0, 1).required(),
      })
    );

    try {
      const users = await schema.validateAsync(req.body);

      const createdUsers = await User.bulkCreate(users);

      return res.status(201).json(createdUsers);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Failed to create users: ${error.message}` });
    }
  }

  // GET /user/{username}
  async getUserByUsername(req, res) {
    try {
      const username = req.params.username;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Failed to get user" });
    }
  }

  // PUT /user/{username}
  async updateUserByUsername(req, res) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      userStatus: Joi.number().integer().valid(0, 1).required(),
    });

    try {
      const { username } = req.params;
      const userData = await schema.validateAsync(req.body);

      const [updatedRowCount] = await User.update(userData, {
        where: { username },
      });

      if (updatedRowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({ message: "User updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update user" });
    }
  }

  // DELETE /user/{username}
  async deleteUserByUsername(req, res) {
    try {
      const username = req.params.username;

      const deletedRowCount = await User.destroy({ where: { username } });

      if (deletedRowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete user" });
    }
  }

  async createUser(req, res) {
    try {
      // Check if the user is logged in (using Basic Authentication)
      const loggedInUser = await this.authenticateUser(req);

      if (!loggedInUser) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Only allow logged-in users to create a new user
      const schema = Joi.object({
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        userStatus: Joi.number().integer().valid(0, 1).required(),
      });

      const userData = await schema.validateAsync(req.body);

      // Create the new user
      const newUser = await User.create(userData);

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create a user" });
    }
  }

  // Middleware for Basic Authentication
  async authenticateUser(req) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return null;
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    // Add your own logic here to check the username and password against your user records
    // For example, you can query the User model and validate the user's credentials
    const user = await User.findOne({ where: { username, password } });

    return user;
  }

  // POST /user/login
  async login(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const base64Credentials = authHeader.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii"
      );
      const [username, password] = credentials.split(":");

      // Authenticate user
      const user = await User.findOne({ where: { username, password } });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Set some session data or generate a token, e.g., JWT, and send it in the response
      // For demonstration purposes, we're just sending a success message
      return res.json({ message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to perform login" });
    }
  }

  // POST /user/logout
  async logout(req, res) {
    try {
      // Perform any necessary cleanup for the logged-out user session or token
      // For demonstration purposes, we're just sending a success message
      return res.json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to perform logout" });
    }
  }
}

module.exports = new UserController();
