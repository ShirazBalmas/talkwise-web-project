import React, { useEffect, useState } from 'react';

const LoggedInUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoggedInUsers();
  }, []);

  const fetchLoggedInUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/loggedinusers");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Logged In Users</h2>
      
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-center">No users are currently logged in.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-700">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-t border-gray-600 hover:bg-gray-800">
                  <td className="px-4 py-2">{user.fullName}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoggedInUsers;
