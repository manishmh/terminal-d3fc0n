import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import React from "react";

type LoginProps = {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setIsLoggedIn }: LoginProps) => {

  return (
    <div className="font-sans h-full">
      <div className="text-red-500 text-lg">Login to start hacking...</div>
      <div className="">
        Check your registered email for your username and password
      </div>
      <div className="flex gap-1">
        <span>username: </span>
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Login;
