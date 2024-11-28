import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth} from "../Firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Spinner } from 'react-bootstrap'; 
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate(); // Initialize navigate

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start loading

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully");
      navigate("/admin-dashboard"); // Navigate to the chatbot page
    } catch {
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  
    return (
    <div className="flex flex-col items-center justify-center w-full px-4 mt-10">
      <div className="bg-white p-4 rounded-lg shadow shadow-slate-700 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium transition duration-200 ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Spinner animation="border" size="sm" className="mr-2" />
                Loading...
              </div>
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
