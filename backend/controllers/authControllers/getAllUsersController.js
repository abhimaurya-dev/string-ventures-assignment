import User from "../../models/User.js";

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export default getAllUsersController;
