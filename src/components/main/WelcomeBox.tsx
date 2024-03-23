"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
const WelcomeBox: React.FC<{}> = () => {
  const router = useRouter();

  useEffect(() => {
    const handleEnter = () => {
      console.log("Redirecting to /shell");
      router.push("/shell");
    };
  
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleEnter();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);
  
  
  return (
    <div className="w-screen max-w-[120rem] h-[45rem]  flex justify-center items-center  z-10 absolute top-0">
      <div className="h-[15rem] text-center w-[15rem]  sm:w-[25rem] outline-dotted text-[#00d900] bg-black p-6  flex flex-col justify-around items-center ">
        <div className="text-2xl"> Welcome to DEFCON </div>

        <button className="border border-blue-900 rounded-lg px-4 py-2 focus:outline-blue-900">
          [ ENTER TO START ]
        </button>
      </div>
    </div>
  );
};

export default WelcomeBox;
