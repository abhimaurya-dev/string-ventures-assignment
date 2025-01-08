import User from "../../models/User.js";

const getUserDetailController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.find({ _id: id });
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export default getUserDetailController;
