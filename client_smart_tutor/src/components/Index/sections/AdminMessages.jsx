import React, { useEffect, useState } from 'react';

const AdminMessages = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      if (user?.role !== 'Admin') return; 

      try {
        const res = await fetch('http://localhost:3000/contact'); 
        if (!res.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      }
    };

    fetchMessages();
  }, [user]);

  if (user?.role !== 'Admin') { 
    return <p className="text-red-500 font-semibold text-center mt-4">Access denied. Admins only.</p>;
  }

  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white">📩 Submitted Messages</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {messages.length === 0 ? (
        <p className="text-gray-300">No messages found.</p>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className="bg-gray-800 rounded-lg p-4 shadow-md text-white border border-gray-700"
            >
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p className="text-sm text-gray-400 mt-2">
                Sent: {new Date(msg.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminMessages;
