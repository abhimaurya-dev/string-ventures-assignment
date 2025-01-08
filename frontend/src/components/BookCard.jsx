import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { fetchApi } from "../utils/fetchapi";
import AddNewBookModal from "./AddNewBookModal";

const BookCard = ({ book, onBorrow, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
  const isUserAdmin = isAdmin();
  const handleUpdate = async (bookData) => {
    const { title, author, publishedYear, genre } = bookData;
    const body = {
      title,
      author,
      publicationYear: publishedYear,
      genre,
      status: "available",
    };
    const response = await fetchApi(`/books/${book._id}`, body, "PUT");
  };
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <figure className="relative">
        <img
          src={book.image ? book.image : "/assets/nobookcover.jpg"}
          alt={book.title}
          className="w-full h-64 object-contain"
        />
        <figcaption className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-sm px-2 py-1">
          {book.title}
        </figcaption>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{book.title}</h2>
        <p className="text-sm">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-sm">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="text-sm">
          <strong>Status:</strong> {book.status}
        </p>
        <p className="text-sm">
          <strong>Published Year:</strong> {book.publicationYear}
        </p>
        {isUserAdmin ? (
          <div className="flex gap-2">
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onDelete(book)}
              >
                Delete
              </button>
            </div>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsModalOpen(true)}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onBorrow(book)}
            >
              Borrow
            </button>
          </div>
        )}
      </div>
      <AddNewBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBook={handleUpdate}
      />
    </div>
  );
};

export default BookCard;
