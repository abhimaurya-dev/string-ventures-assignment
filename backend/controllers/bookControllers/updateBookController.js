import Book from "../../models/Book.js";
import CustomError from "../../utils/customError.js";

const updateBookController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) throw new CustomError("Book not found", 404);

    res.status(200).json({ success: true, book: updatedBook });
  } catch (error) {
    next(error);
  }
};

export default updateBookController;
