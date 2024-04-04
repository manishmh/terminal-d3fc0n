"use client";

// todo: change time of typing in story mode before production.

import CommandHistory from "@/components/history/command-history";
import Login from "@/components/login/page";
import Input from "@/components/shell/Input";
import HandleFlagEntry from "@/components/shell/handle-flag-entry";
import HandleQuestion from "@/components/shell/handle-question";
import SetUsername from "@/components/shell/set-username";
import WelcomeMessage from "@/components/shell/welcome-message";
import StoryLineUpdater from "@/components/story-line/story-line-updater";
import StoryMode from "@/components/story-line/story-mode";
import { checkUsernameExists } from "@/store/useLocalstorage";
import {  useEffect, useRef, useState } from "react";
import { MyComponent } from "../bin";
import Sponsers from "@/components/shell/sponsers";

const Shell = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<
    { command: string; response: string[] }[]
  >([]);
  const [shellInput, setShellInput] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [banner, setBanner] = useState<boolean>(true);
  const [showInput, setShowInput] = useState(true);
  const [showQuestion, setShowQuestion] = useState(true);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [storyLine, setStoryLine] = useState<boolean>(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const updateStory = StoryLineUpdater();
    if (updateStory) {
      setStoryLine(true);
    }
  }, []);


  MyComponent();
  const UsernameExists = checkUsernameExists();


  return (
    <div className="p-4 md:p-8 h-screen font-sans" suppressHydrationWarning={true}>
      <div className=" h-full overflow-hidden">
        <div
          className=" h-full overflow-y-auto no-scrollbar"
          ref={containerRef}
        >
          {!UsernameExists && <SetUsername />}
          {!isLoggedIn && UsernameExists && (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
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
                  setStoryLine={setStoryLine}
                />
              )}
              {!showQuestion && (
                <HandleQuestion
                  setHistory={setHistory}
                  setShowQuestion={setShowQuestion}
                />
              )}
              {showInput && showQuestion && (
                <Input
                  shellInput={shellInput}
                  setShellInput={setShellInput}
                  setHistory={setHistory}
                  setBanner={setBanner}
                  setShowInput={setShowInput}
                  cmdHistory={cmdHistory}
                  setCmdHistory={setCmdHistory}
                  setShowQuestion={setShowQuestion}
                />
              )}
            </>
          )}
        </div>
      </div>
      <Sponsers />
    </div>
  );
};

export default Shell;
