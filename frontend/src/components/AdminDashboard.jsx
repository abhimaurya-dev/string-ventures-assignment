import { useState, useEffect } from "react";
import AddNewBookModal from "../components/AddNewBookModal";
import { fetchApi } from "../utils/fetchapi";

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetchApi("/transactions/get", [], "GET");
        response.transactions.map(async (transaction) => {
          const bookId = transaction.bookId;
          const userId = transaction.userId;
          const getBookResponse = await fetchApi(
            `/books/detail/${bookId}`,
            [],
            "GET"
          );
          const getUserResponse = await fetchApi(
            `/auth//get-user-detail/${userId}`,
            [],
            "GET"
          );
          transaction["title"] = getBookResponse.book[0].title;
          transaction["user"] = getUserResponse.user[0].name;
        });
        setTransactions(response.transactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      const statsResponse = await fetchApi("/stats", [], "GET");
      console.log(statsResponse);
      setStats(statsResponse.stats);
    };

    fetchTransactions();
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-bold">Total Books</h2>
          <p className="text-xl">{stats.totalBooks}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-bold">Currently Borrowed</h2>
          <p className="text-xl">{stats.borrowedBooks}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-bold">Available books</h2>
          <p className="text-xl">{stats.availableBooks}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-xl">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Add New Book Button */}
      <div className="mb-6">
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Book
        </button>
      </div>

      {/* Transactions Section */}
      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Transactions</h2>
        {loading ? (
          <p>Loading transactions...</p>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Book</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {console.log(transactions[0])}
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction._id}</td>
                    <td>{transaction.user}</td>
                    <td>{transaction.title}</td>
                    <td>{transaction.type}</td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
