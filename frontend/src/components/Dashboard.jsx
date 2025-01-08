import { useState, useEffect } from "react";
import { fetchApi } from "../utils/fetchapi";

const Dashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const userTransactionsResponse = await fetchApi(
          "/transactions/get-user",
          [],
          "GET"
        );

        // console.log(userTransactionsResponse.userTransactions);
        userTransactionsResponse.userTransactions.forEach(
          async (userTransaction) => {
            // console.log(userTransaction.bookId);
            const booksDetailResponse = await fetchApi(
              `/books/detail/${userTransaction.bookId}`
            );
            // console.log(booksDetailResponse.book[0].title);
            if (userTransaction.type === "borrow") {
              userTransaction["title"] = booksDetailResponse.book[0].title;
              setBorrowedBooks((previous) => [previous, userTransaction]);
            } else {
              userTransaction["title"] = booksDetailResponse.book[0].title;
              setReturnedBooks((previous) => [previous, userTransaction]);
            }
          }
        );
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    };

    fetchBooksData();
  }, []);

  const handleReturn = async (book) => {
    console.log(book.bookId);
    const body = { bookID: book.bookId, type: "return" };
    const respose = await fetchApi("/transactions/create", body, "POST");
    console.log(respose);
    setBorrowedBooks((prevBooks) =>
      prevBooks.filter((b) => b._id !== book._id)
    );
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Books Borrowed Table */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Books Borrowed</h3>
            {borrowedBooks.length === 0 ? (
              <div className="alert alert-warning">
                <span>No borrowed books found.</span>
              </div>
            ) : (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Borrowed On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.map((book, index) => (
                    <tr key={index}>
                      <td>{book.title}</td>
                      <td>
                        {new Date(book.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleReturn(book)}
                        >
                          Return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Books Returned Table */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Books Returned</h3>
            {returnedBooks.length === 0 ? (
              <div className="alert alert-info">
                <span>No returned books found.</span>
              </div>
            ) : (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Returned On</th>
                  </tr>
                </thead>
                <tbody>
                  {returnedBooks.map((book, index) => (
                    <tr key={index}>
                      <td>{book.title}</td>
                      <td>
                        {new Date(book.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
