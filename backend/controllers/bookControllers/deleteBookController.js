import Book from "../../models/Book.js";
import CustomError from "../../utils/customError.js";

const deleteBookController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) throw new CustomError("Book not found", 404);

    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default deleteBookController;
