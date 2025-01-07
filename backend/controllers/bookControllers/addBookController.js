import Book from "../../models/Book.js";
import CustomError from "../../utils/customError.js";

const addBookController = async (req, res, next) => {
  try {
    const { title, author, publicationYear, genre } = req.body;
    if (!title || !author || !publicationYear) {
      throw new CustomError("All fields are required", 400);
    }

    const newBook = new Book({
      title,
      author,
      publicationYear,
      genre,
      status: "available",
    });
    const savedNewBook = await newBook.save();
    res.status(201).json({ success: true, book: savedNewBook });
  } catch (error) {
    next(error);
  }
};

export default addBookController;
