"use client";

import { SHELL_COMMANDS_RESPONSE } from "@/app/bin";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CompareInputValue } from "./compare-input-value";

type InputProps = {
  shellInput: string;
  setShellInput: Dispatch<SetStateAction<string>>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  setHistory: Dispatch<SetStateAction<{ command: string; response: string[] }[]>>; 
};

const Input = ({
  shellInput,
  setShellInput,
  containerRef,
  setHistory,
}: InputProps) => {
  const [comparedValue, setComparedValue] = useState<boolean>(false);

  // comparing the input value to the set commands and rendering it only when shellInput changes. 
  useEffect(() => {
    const value = CompareInputValue({ input: shellInput });
    setComparedValue(value);
  }, [shellInput]);

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.code === "13") {
      console.log("enter");
      event.preventDefault();
      console.log("scrollheight", containerRef.current?.scrollHeight);
      handleHistory(shellInput);
    }
  };

  const handleHistory = (history: string) => {
    const command = history.trim();
    const response = SHELL_COMMANDS_RESPONSE[command];
    if (response) {
      setHistory((prevHistory) => [...prevHistory, { command, response }]);
    } else {
      setHistory((prevHistory) => [
        ...prevHistory,
        { command, response: ["Command not found"] },
      ]);
    }
    setShellInput("");
  };

  return (
    <div className="flex gap-1 font-sans flex-1">
      <div className="font-medium text-lg flex bg-gray700 gap-[2px] items-center">
        <span className="text-[#19fc00]">anonymous@d3fc0n</span>
        <span>:</span>
        <span className="text-base">$</span>
        <span>~</span>
      </div>
      <input
        type="text"
        autoFocus
        spellCheck="false"
        value={shellInput}
        onKeyDown={onSubmit}
        autoComplete="off"
        onChange={(e) => setShellInput(e.target.value)}
        className={`w-full bg-transparent border-0 outline-none caret-[#19fc00] pl-[2px]
          ${comparedValue ? "text-[#19fc00]" : "text-red-500"} 
        `}
      />
    </div>
  );
};

export default Input;
