import Book from "../../models/Book.js";
import CustomError from "../../utils/customError.js";

const getBooksController = async (req, res, next) => {
  try {
    const { title, author, publicationYear, genre } = req.query;
    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (author) filter.author = { $regex: author, $options: "i" };
    if (publicationYear) filter.publicationYear = Number(publicationYear);
    if (genre) filter.genre = { $regex: `^${genre}$`, $options: "i" };
    const books = await Book.find(filter);

    res.status(200).json({ success: true, books });
  } catch (error) {
    next(error);
  }
};

export default getBooksController;
