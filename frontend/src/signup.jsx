import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./store/auth";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  
  // For navigation
  const navigate = useNavigate();
  
  // Function to store token in local storage
  const  { storeTokenInLS }  = useAuth();


  // State for error message
  const [error, setError] = useState("");

  // handling the form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Print user input to console
    // console.log("User input:", user);

    // Check if passwords match
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    };

    try {
      const response = await fetch(`http://localhost:4000/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // console.log("Response status:", response.status);
      // console.log("Response ok:", response.ok);

      if (response.ok) {
        const res_data = await response.json();
        // console.log("res from server", res_data);

        // storeToken in local storage
        storeTokenInLS(res_data.token,);
        
        setUser({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/");
      } else {
        const errorData = await response.json().catch(err => {
          // console.error("Error parsing JSON:", err);
          setError("An error occurred during signup");
        });
        // console.log("Error response from server:", errorData);
        setError(errorData.message || "An error occurred during signup");
      }
    } catch (err) {
      // console.error("Fetch error:", err);
      setError("An error occurred during signup");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white py-6 px-8 rounded-lg shadow-lg w-full max-w-xs">
        <h2 className="text-xl font-bold text-center text-blue-700 mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <input
            type="text"
            name="username"
            placeholder="user name"
            value={user.username}
            onChange={handleChange}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            required
          />

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            required
          />

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className={`w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-700"
                }`}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={handleChange}
              className={`w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-700"
                }`}
              required
            />
            {error && (
              <p className="text-xs text-red-500 mt-2">{error}</p> // Display error message
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-sm bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            Sign Up
          </button>
          <p className='text-center'>
            Alerady have a account?
            <Link to='/login' className='text-blue-600'>Login in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
