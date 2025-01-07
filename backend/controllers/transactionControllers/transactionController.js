import Book from "../../models/Book.js";
import Transaction from "../../models/Transaction.js";
import CustomError from "../../utils/customError.js";

const transactionController = async (req, res, next) => {
  try {
    const { bookID, type } = req.body;
    const book = await Book.findOne({ _id: bookID });
    if (!book) {
      throw new CustomError("Book not found!", 404);
    }
    if (type === "borrow" && book.status === "borrowed") {
      throw new CustomError("Book not available", 400);
    }
    if (type === "return" && book.status === "available") {
      throw new CustomError("Can't return book already available", 400);
    }
    const newTransaction = new Transaction({
      userId: req.user.id,
      bookId: bookID,
      type,
    });
    await newTransaction.save();
    book.status = type === "borrow" ? "borrowed" : "available";
    await book.save();
    res.status(201).json({
      success: true,
      message: "Transaction Successfull",
    });
  } catch (error) {
    next(error);
  }
};

export default transactionController;
