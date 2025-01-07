import Transaction from "../../models/Transaction.js";

const getTransactionsController = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

export default getTransactionsController;
