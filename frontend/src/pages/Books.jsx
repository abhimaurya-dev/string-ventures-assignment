import { useState, useEffect, useContext } from "react";
import BookCard from "../components/BookCard";
import { fetchApi } from "../utils/fetchapi";
import AddNewBookModal from "../components/AddNewBookModal";
import { AuthContext } from "../context/authContext";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
  const isUserAdmin = isAdmin();

  // Fetch books from the API
  const fetchBooks = async () => {
    try {
      // TODO: change to available books when user
      const { books } = await fetchApi("/books", [], "GET");
      setBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrow = async (book) => {
    // console.log(book);
    const body = { bookID: book._id, type: "borrow" };
    const respose = await fetchApi("/transactions/create", body, "POST");
    console.log(respose);
    setBooks((prevBooks) => prevBooks.filter((b) => b._id !== book._id));
  };

  const handleAddBook = async (bookData) => {
    const { title, author, publishedYear, genre } = bookData;
    const body = {
      title,
      author,
      publicationYear: publishedYear,
      genre,
      status: "available",
    };
    const response = await fetchApi("/books/new", body, "POST");
  };
  const handleDelete = async (book) => {
    const response = await fetchApi(`/books/${book._id}`, [], "DELETE");
    setBooks((prevBooks) => prevBooks.filter((b) => b._id !== book._id));
  };

  return (
    <div className="container mx-auto p-4">
      {isUserAdmin && (
        <div className="mb-6 flex flex-row-reverse">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Book
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="text-center col-span-full">
            <p>Loading...</p>
          </div>
        ) : (
          books.map((book) => (
            <div key={book._id}>
              <BookCard
                book={book}
                onBorrow={handleBorrow}
                onDelete={handleDelete}
              />
            </div>
          ))
        )}

        {books.length === 0 && !loading && (
          <div className="text-center col-span-full">
            <p>No books available</p>
          </div>
        )}
      </div>
      {/* Add New Book Modal */}
      <AddNewBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBook={handleAddBook}
      />
    </div>
  );
};

export default Books;
