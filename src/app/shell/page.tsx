"use client";

// todo: change time of typing in story mode before production.

import CommandHistory from "@/components/history/command-history";
import Login from "@/components/login/page";
import Input from "@/components/shell/Input";
import HandleFlagEntry from "@/components/shell/handle-flag-entry";
import SetUsername from "@/components/shell/set-username";
import WelcomeMessage from "@/components/shell/welcome-message";
import StoryLineUpdater from "@/components/story-line/story-line-updater";
import StoryMode from "@/components/story-line/story-mode";
import { useEffect, useRef, useState } from "react";
import useStore from "@/store/useStore";
import { checkUsernameExists } from "@/store/useLocalstorage";

const Shell = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<
    { command: string; response: string[] }[]
  >([]);
  const [shellInput, setShellInput] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // todo: turn it false when pushin to production
  const [banner, setBanner] = useState<boolean>(true);
  const [showInput, setShowInput] = useState(true);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [storyLine, setStoryLine] = useState<boolean>(false);
  const { player } = useStore();
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const updateStory = StoryLineUpdater()
    if (updateStory) {
      setStoryLine(true) 
    }
  },[])

  const UsernameExists = checkUsernameExists();

  return (
    <div className="p-4 md:p-8 h-screen font-sans">
      <div className=" h-full overflow-hidden">
        <div
          className=" h-full overflow-y-auto no-scrollbar"
          ref={containerRef}
        >
          {!UsernameExists && <SetUsername />}
          {!isLoggedIn && UsernameExists && <Login setIsLoggedIn={setIsLoggedIn} />}
          {isLoggedIn && storyLine && <StoryMode setStoryLine={setStoryLine} />}
          {isLoggedIn && !storyLine && (
            <>
              {banner && <WelcomeMessage />}
              {history.map((his, index) => (
                <CommandHistory history={his} key={index} />
              ))}
              {!showInput && (
                <HandleFlagEntry
                  setShowInput={setShowInput}
                  setHistory={setHistory}
                />
              )}
              {showInput && (
                <Input
                  shellInput={shellInput}
                  setShellInput={setShellInput}
                  setHistory={setHistory}
                  setBanner={setBanner}
                  setShowInput={setShowInput}
                  cmdHistory={cmdHistory}
                  setCmdHistory={setCmdHistory}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shell;
