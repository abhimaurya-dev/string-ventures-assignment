import React, { useState, useEffect } from "react";
import CreateUserModal from "../components/CreateUserModal";
import { fetchApi } from "../utils/fetchapi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await fetchApi("/auth/get-users", [], "GET");
        setUsers(usersResponse.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = (newUser) => {
    // Add the new user to the users list (could also re-fetch the API)
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Add New User Button */}
      <div className="mb-6">
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add New User
        </button>
      </div>

      {/* User Table */}
      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Current Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Users;
