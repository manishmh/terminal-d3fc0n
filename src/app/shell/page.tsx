"use client";

import CommandHistory from "@/components/history/command-history";
import Login from "@/components/login/page";
import Input from "@/components/shell/Input";
import { useEffect, useRef, useState } from "react";

const Shell = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<
    { command: string; response: string[] }[]
  >([]);
  // todo: history is rendering when input changes. fix to only after enter key press.
  const [shellInput, setShellInput] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="p-8 h-screen">
      <div className=" h-full overflow-hidden">
        <div
          className=" h-full overflow-y-auto no-scrollbar"
          ref={containerRef}
        >
          <Login setIsLoggedIn={setIsLoggedIn} />
          {isLoggedIn && (
            <>
              {history.map((his, index) => (
                <CommandHistory history={his} key={index} />
              ))}
              <Input
                shellInput={shellInput}
                setShellInput={setShellInput}
                containerRef={containerRef}
                setHistory={setHistory}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shell;
