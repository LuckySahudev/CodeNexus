import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const LoginPopUp = ({ setIsLogin, setShowLogin, setUserName }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      if (!formData.get("gmail") || !formData.get("password")) {
        alert("Please fill in all fields.");
        return;
      }

      const data = Object.fromEntries(formData);

      const res = await axios.post("http://localhost:8080/login/gmail", data);

      console.log("Login response:", res.status, res.data);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        setUserName(res.data.username);
        setIsLogin(true);
        setShowLogin(false);
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response.status === 401) {
        alert("Invalid Password");
      }
      if (error.response.status === 404) {
        alert("No User Available");
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      if (
        !formData.get("username") ||
        !formData.get("gmail") ||
        !formData.get("password") ||
        !formData.get("confirmPassword")
      ) {
        alert("Please fill in all fields.");
        return;
      }

      if (formData.get("password") !== formData.get("confirmPassword")) {
        alert("Passwords do not match. Please try again.");
        return;
      }

      const data = Object.fromEntries(formData);

      const res = await axios.post("http://localhost:8080/signup", data);

      if (res.status === 201) {
        alert("Sign up successful!");

        localStorage.setItem("token", res.data.token);
        setUserName(res.data.username);
        setIsLogin(true);
        setShowLogin(false);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={() => setShowLogin(false)}
    >
      <div
        className="relative w-[400px] rounded-xl bg-zinc-900 border border-zinc-700 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 p-1 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={isSignUp ? handleSignUp : handleLogIn}>
          

          <input
            type="gmail"
            name="gmail"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-600 text-white outline-none focus:border-amber-500"
          />

          {isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full mb-4 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-600 text-white outline-none focus:border-amber-500"
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-600 text-white outline-none focus:border-amber-500"
          />

          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full mb-6 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-600 text-white outline-none focus:border-amber-500"
            />
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-zinc-400 mt-5 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 text-amber-500 hover:text-amber-400 font-semibold"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPopUp;
