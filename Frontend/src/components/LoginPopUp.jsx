import React, { useState } from "react";
import { Eye, EyeOff, LoaderCircle, X } from "lucide-react";
import api from "../api";

const LoginPopUp = ({ setIsLogin, setShowLogin, setUserName }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      if (!formData.get("gmail") || !formData.get("password")) {
        alert("Please fill in all fields.");
        return;
      }

      const data = Object.fromEntries(formData);

      setIsSubmitting(true);
      const res = await api.post("/login/gmail", data);

      console.log("Login response:", res.status, res.data);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("user_num_id", res.data.user_num_id);
        setUserName(res.data.username);
        setIsLogin(true);
        setShowLogin(false);
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        alert("Invalid Password");
      }
      if (error.response?.status === 404) {
        alert("No User Available");
      }
      if (!error.response || ![401, 404].includes(error.response.status)) {
        alert(error.response?.data?.mess || "Could not sign in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
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

      setIsSubmitting(true);
      const res = await api.post("/signup", data);

      if (res.status === 201) {
        alert("Sign up successful!");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("user_num_id", res.data.user_num_id);
        setUserName(res.data.username);
        setIsLogin(true);
        setShowLogin(false);
      }
    } catch (error) {

      if (error.response?.status === 409) {
        alert(error.response.data.mess);
      }
      else{
        console.error("Sign up error:", error);
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="auth-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-8 backdrop-blur-sm"
      onClick={() => setShowLogin(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative w-full max-w-[420px] rounded-2xl border border-mist-700 bg-zinc-950 p-7 font-sans shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => setShowLogin(false)}
          aria-label="Close sign in"
          className="absolute right-5 top-5 rounded-lg p-2 text-gray-400 transition hover:bg-mist-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 disabled:cursor-default disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <div className="mb-8 pr-8">
          <h2 id="auth-title" className="text-[22px] font-bold tracking-tight text-white">
            <span>CODE</span><span className="text-amber-500">NEXUS</span>
          </h2>
          <p className="mt-1 text-[11px] leading-4 text-gray-400">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        <form onSubmit={isSignUp ? handleSignUp : handleLogIn}>
          <div className="space-y-4 rounded-xl border border-mist-700 bg-mist-900/50 p-4">
          {isSignUp && (
            <div>
              <label htmlFor="auth-username" className="mb-2 block text-xs font-medium text-gray-300">Username</label>
              <input id="auth-username" type="text" name="username" disabled={isSubmitting} placeholder="Choose a username" autoComplete="username" className="auth-input w-full rounded-lg border border-mist-700 bg-mist-900 px-4 py-3 text-sm text-gray-100 outline-none transition placeholder:text-gray-500 hover:border-mist-600 focus:border-[#ad9367] focus:ring-2 focus:ring-[#ad9367]/20 disabled:opacity-60" />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="mb-2 block text-xs font-medium text-gray-300">Email address</label>
            <input id="auth-email" type="email" name="gmail" disabled={isSubmitting} placeholder="you@example.com" autoComplete="email" className="auth-input w-full rounded-lg border border-mist-700 bg-mist-900 px-4 py-3 text-sm text-gray-100 outline-none transition placeholder:text-gray-500 hover:border-mist-600 focus:border-[#ad9367] focus:ring-2 focus:ring-[#ad9367]/20 disabled:opacity-60" />
          </div>

          <div>
            <label htmlFor="auth-password" className="mb-2 block text-xs font-medium text-gray-300">Password</label>
            <div className="relative">
              <input id="auth-password" type={showPassword ? "text" : "password"} name="password" disabled={isSubmitting} placeholder="Enter your password" autoComplete={isSignUp ? "new-password" : "current-password"} className="auth-input w-full rounded-lg border border-mist-700 bg-mist-900 px-4 py-3 pr-12 text-sm text-gray-100 outline-none transition placeholder:text-gray-500 hover:border-mist-600 focus:border-[#ad9367] focus:ring-2 focus:ring-[#ad9367]/20 disabled:opacity-60" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition hover:bg-mist-800 hover:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad9367]/50">
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="auth-confirm-password" className="mb-2 block text-xs font-medium text-gray-300">Confirm password</label>
              <div className="relative">
                <input id="auth-confirm-password" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" disabled={isSubmitting} placeholder="Re-enter your password" autoComplete="new-password" className="auth-input w-full rounded-lg border border-mist-700 bg-mist-900 px-4 py-3 pr-12 text-sm text-gray-100 outline-none transition placeholder:text-gray-500 hover:border-mist-600 focus:border-[#ad9367] focus:ring-2 focus:ring-[#ad9367]/20 disabled:opacity-60" />
                <button type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} aria-pressed={showConfirmPassword} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition hover:bg-mist-800 hover:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad9367]/50">
                  {showConfirmPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
            </div>
          )}

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500 bg-amber-500 py-3 text-sm font-semibold text-black transition hover:border-amber-400 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-default disabled:opacity-70"
          >
            {isSubmitting && <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />}
            {isSubmitting
              ? isSignUp ? "Creating account…" : "Logging in…"
              : isSignUp ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-1 font-medium text-[#c5aa78] transition hover:text-[#ddc79c] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ad9367]/50 disabled:cursor-default disabled:opacity-50"
          >
            {isSignUp ? "Sign in" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPopUp;
