import Book from "../../models/Book.js";
import CustomError from "../../utils/customError.js";

const getBooksController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.find({ _id: id });

    res.status(200).json({ success: true, book });
  } catch (error) {
    next(error);
  }
};

export default getBooksController;
