// src/components/RegistrationForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../Firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from 'react-bootstrap';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });

      setSuccess("Registration successful!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Error registering user. Please try again.");
      console.error("Firestore error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-4 mt-10">
      <div className="bg-white p-4 rounded-lg shadow shadow-slate-700 w-full max-w-md"> {/* Reduced padding and max-width */}
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Register</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-500 text-center mb-2">{success}</p>}

        <form onSubmit={handleRegister} className="space-y-3"> {/* Reduced space between fields */}
          <div>
            <label htmlFor="firstName" className="block font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-2 top-2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-2 top-2 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
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
              "Register"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
