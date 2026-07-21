import React from "react";
import { X } from 'lucide-react'

const LoginPopUp = ({setIsLogin,setShowLogin,setUserName}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={() => setShowLogin(false)}
    >
      <div
        className="relative w-[400px] rounded-xl bg-zinc-900 border border-zinc-700 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 p-1 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

        <input
          onChange={(e)=>{
            setUserName(e.target.value);
          }}
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-600 text-white outline-none focus:border-amber-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-600 text-white outline-none focus:border-amber-500"
        />

        <button
          className="w-full py-2 rounded-md bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
          onClick={() => {
            setIsLogin(true);
            setShowLogin(false);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPopUp;
