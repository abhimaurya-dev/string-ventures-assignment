import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  genre: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "borrowed"],
    default: "available",
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
