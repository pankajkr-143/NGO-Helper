import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./store/auth";


const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  // For navigation
  const navigate = useNavigate();

  // Function to store token in local storage
  const  {storetokenInLS}  = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);

      if (response.ok) {
        const res_data = await response.json();
        // alert("login successful");
        // storeToken in local storage
        storetokenInLS(res_data.token,);

        setUser({
          email: "",
          password: "",
        });
        navigate("/");

      } else {
        alert("invalid credentials ");
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
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
            value={user.email}
            onChange={handleChange}
            className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
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
        <p className='text-center'>
          New here?
          <Link to='/signup' className='text-blue-600'>Create new Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
