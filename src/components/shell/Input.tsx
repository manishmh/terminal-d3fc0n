"use client";

import { SHELL_COMMANDS_RESPONSE } from "@/app/bin";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CompareInputValue } from "./compare-input-value";
import HandleCommandInput from "./handle-command-input";

type InputProps = {
  shellInput: string;
  setShellInput: Dispatch<SetStateAction<string>>;
  setHistory: Dispatch<
    SetStateAction<{ command: string; response: string[] }[]>
  >;
  setBanner: Dispatch<SetStateAction<boolean>>;
  setShowInput: Dispatch<SetStateAction<boolean>>;
  cmdHistory: string[];
  setCmdHistory: Dispatch<SetStateAction<string[]>>;
  setShowQuestion: Dispatch<SetStateAction<boolean>>,
};

const Input = ({
  shellInput,
  setShellInput,
  setHistory,
  setBanner,
  setShowInput,
  cmdHistory,
  setCmdHistory,
  setShowQuestion
}: InputProps) => {
  const [comparedValue, setComparedValue] = useState<boolean>(false);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  
  // comparing the input value to the set commands and rendering it only when shellInput changes.
  useEffect(() => {
    const value = CompareInputValue({ input: shellInput });
    setComparedValue(value);
  }, [shellInput]);

  // handling the response of command when entered.
  const handleHistory = (history: string) => {
    const command = history.trim();
    const response = SHELL_COMMANDS_RESPONSE[command];
    // if reponse of a command exists then display it other wise display command not found.
    // handle command input handles exception command input. commands does not need to display info but to take input or other response.
    if (response) {
      setHistory((prevHistory) => [...prevHistory, { command, response }]);
      HandleCommandInput(command, setHistory, setBanner, setShowInput, setShowQuestion);
    } else {
      setHistory((prevHistory) => [
        ...prevHistory,
        { command, response: ["Command not found"] },
      ]);
    }
    setShellInput("");
  };

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(event)
    if (event.key === "Enter" || event.code === "13") {
      event.preventDefault();

      // handling the display of contents of commands.
      handleHistory(shellInput);
      // storing a list of commands history to be used for up and down key navigation. 
      setCmdHistory((prev) => [...prev, shellInput]);
    } else if (event.key === "ArrowUp" || event.code === "38") {
      event.preventDefault();

      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(historyIndex - 1, 0);
      const lastCommand = newIndex >= 0 ? cmdHistory[newIndex]: "";
      setShellInput(lastCommand);
      setHistoryIndex(newIndex);

    } else if (event.key === "ArrowDown" || event.code === "40") {
      event.preventDefault();

      const newIndex = historyIndex === -1 ? -1 : Math.min(historyIndex + 1, cmdHistory.length - 1);
      const nextCommand = newIndex >= 0 ? cmdHistory[newIndex]: "";
      setShellInput(nextCommand);
      setHistoryIndex(newIndex);
    }
  };

  return (
    <div className="flex gap-1 flex-1">
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
