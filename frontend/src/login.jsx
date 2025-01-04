import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login successful!", formData);
    // Add API call here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs">
        <h2 className="text-2xl sm:text-2xl font-bold text-center text-blue-700 mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            required
          />
          <button
            type="submit"
            className="w-full text-sm bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-700 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
