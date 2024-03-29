import React from 'react';
import { RoutePath } from "../common/Route";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="font-bold bg-gray-200 text-black p-2.5 flex justify-between">
      <div></div>
      <div className="mx-5">
          <a href="/about" className="text-black mr-5 font-[DotGothic16]">
            About us...
          </a>
        <a href="/signup" className="text-black mr-5 font-[DotGothic16]">Sign Up</a>
        <a href="/guest-login" className="text-black mr-5 font-[DotGothic16]">Guest Login</a>
        <a href="/login" className="text-black font-[DotGothic16]">
            Login
          </a>
      </div>
    </div>
  );
};

export default Header;