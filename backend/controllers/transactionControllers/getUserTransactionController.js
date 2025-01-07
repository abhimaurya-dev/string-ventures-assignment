import Transaction from "../../models/Transaction.js";

const getUserTransactionController = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const userTransactions = await Transaction.find({ userId: userID });
    res.status(200).json({
      success: true,
      userTransactions,
    });
  } catch (error) {
    next(error);
  }
};

export default getUserTransactionController;
