import Book from "../../models/Book.js";

const getStatsController = async (req, res, next) => {
  try {
    const totalBooks = await Book.countDocuments();
    const borrowedBooks = await Book.countDocuments({ status: "borrowed" });

    res.status(200).json({
      success: true,
      stats: {
        totalBooks,
        borrowedBooks,
        availableBooks: totalBooks - borrowedBooks,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getStatsController;
