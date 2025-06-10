import React from 'react';

const Header = ({ onLoginClick, onSignupClick, onNavigate }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
 const handleLogout = async () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const username = user?.username;

  if (username) {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  }

  localStorage.removeItem("loggedInUser");
  window.location.reload(); // Reload or redirect to login/home page
};


  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white px-8 py-4 shadow-md z-50 flex flex-col md:flex-row items-center justify-between">
      <div className="text-2xl font-bold mb-4 md:mb-0">Smart Tutor</div>

      <nav className="mb-4 md:mb-0">
        <ul className="flex space-x-6">
          <li>
            <button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition focus:outline-none">Home</button>
          </li>
          <li>
            <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition focus:outline-none">About</button>
          </li>
          <li>
            <button onClick={() => onNavigate('services')} className="hover:text-blue-400 transition focus:outline-none">Services</button>
          </li>
          <li>
            <button
              onClick={() => {
                const user = JSON.parse(localStorage.getItem("loggedInUser"));
                if (user?.role === "Admin") {
                  onNavigate("admin-contact");
                } else {
                  onNavigate("contact");
                }
              }}
              className="hover:text-blue-400 transition focus:outline-none"
            >
              Contact
            </button>
          </li>

           <li>
          <button onClick={() => onNavigate('ai')} className="hover:text-blue-400 transition focus:outline-none">AI Tools</button>
        </li>
        </ul>
      </nav>

      <div className="flex space-x-4">
        
        {loggedInUser ? (
          <>
            <span className="bg-gray-700 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded transition">
              Welcome, {loggedInUser.username}
            </span>
              {loggedInUser.role === 'Admin' && (
                <button
                  onClick={() => onNavigate('LoggedInUsers')}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-4 py-2 rounded transition"
                >
                  View Logged In Users
                </button>
              )}


            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>

          ) : (
          <>
            <button onClick={onLoginClick} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition">Log In</button>
            <button onClick={onSignupClick} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded">Sign Up</button>
          </>
        )}
      </div>
      
    </header>
  );
};

export default Header;
