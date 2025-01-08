import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const registerController = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export default registerController;
