import Book from "../../models/Book.js";
import User from "../../models/User.js";

const getStatsController = async (req, res, next) => {
  try {
    const totalBooks = await Book.countDocuments();
    const borrowedBooks = await Book.countDocuments({ status: "borrowed" });
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalBooks,
        borrowedBooks,
        availableBooks: totalBooks - borrowedBooks,
        totalUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getStatsController;
