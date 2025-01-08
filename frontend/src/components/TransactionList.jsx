import React from "react";

const TransactionList = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Book</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? (
            transactions.map((txn, index) => (
              <tr key={txn.id}>
                <td>{index + 1}</td>
                <td>{txn.user}</td>
                <td>{txn.book}</td>
                <td
                  className={
                    txn.type === "borrowed" ? "text-green-500" : "text-red-500"
                  }
                >
                  {txn.type}
                </td>
                <td>{txn.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
