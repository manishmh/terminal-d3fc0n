import useStore from "@/store/useStore";
import { LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, MRROBOT, OUTRO } from "@/story";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomTypewriter from "../main/CustomWriter";

type StoryModeProps = {
  setStoryLine: Dispatch<SetStateAction<boolean>>;
};

const StoryMode = ({ setStoryLine }: StoryModeProps) => {
  const { player } = useStore();
  let level: 1 | 2 | 3 | 4  = player.level;
  const [countdown, setCountdown] = useState(level === 1 ? 100 : 60);

  const NEW_LEVEL_1: string = LEVEL_1.replace("[User]", player.userName);

  const CurrentLevel = () => {
    switch (level) {
      case 1:
        return NEW_LEVEL_1;
      case 2:
        return LEVEL_2;
      case 3:
        return LEVEL_3;
      case 4:
        return LEVEL_4;
      default:
        return "";
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.code === "13") {
      setStoryLine(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStoryLine(false);
    }, 60000);

    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [setStoryLine, player.level]);


  return (
    <>
      <div className="flex h-full">
        <div className="flex-1 flex justify-center flex-col">
          <CustomTypewriter speed={10} text={CurrentLevel()}>
            <div>
              <div className="flex items-center mt-2">
                <div className="mt2">&#62;</div>
                <input
                  type="number"
                  autoFocus
                  spellCheck="false"
                  placeholder={`redirect to terminal in ${countdown} seconds or enter to exit`}
                  className="bg-transparent border-none outline-none number-input ml-3 w-full placeholder:text-sm placeholder:text-red-500"
                  onKeyDown={handleEnter}
                />
              </div>
            </div>
          </CustomTypewriter>
        </div>
        <div className="flex-1 md:max-w-md xl:max-w-xl ">
          <CustomTypewriter speed={1} text={MRROBOT}>
            <span></span>
          </CustomTypewriter>
        </div>
      </div>
    </>
  );
};

export default StoryMode;
