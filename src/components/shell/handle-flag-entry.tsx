import useStore from "@/store/useStore";
import { Dispatch, SetStateAction, useState, useTransition } from "react";

type HandleFlagEntryProps = {
  setHistory: Dispatch<
    SetStateAction<{ command: string; response: string[] }[]>
  >;
  setShowInput: Dispatch<SetStateAction<boolean>>;
  setStoryLine: Dispatch<SetStateAction<boolean>>;
};

const HandleFlagEntry = ({
  setShowInput,
  setHistory,
  setStoryLine,
}: HandleFlagEntryProps) => {
  const [isPending, startTransition] = useTransition();
  const [flag, setFlag] = useState("");
  const { token, player, setPlayer } = useStore();

  const handleFlagSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.code === "13") {
      startTransition(async () => {
        try {
          const response = await fetch(
            "https://d3fcon-backend.onrender.com/submit/flag",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ flag }),
            }
          );
          const data = await response.json();

          if (response.status === 200) {
            const newLevel = player.level + 1;
            const updatedPlayer = {
              userName: player.userName,
              level: newLevel,
              token: player.token,
              currentQuest: player.currentQuest,
            };

            setPlayer(updatedPlayer);
            setHistory((prevHistory) => [
              ...prevHistory,
              { command: "", response: [data.message] },
            ]);
            setTimeout(() => {
              setStoryLine(true);
            }, 2000);
          } else
            setHistory((prevHistory) => [
              ...prevHistory,
              { command: "", response: [data.message] },
            ]);

          setShowInput(true);
        } catch (error) {
          console.error(error);
        }
      });
    }
  };

  return (
    <>
      {isPending && <div>checking flag...</div>}
      <div className="flex gap-1">
        <div>answer: </div>
        <input
          type="text"
          autoFocus
          spellCheck="false"
          value={flag}
          onKeyDown={handleFlagSubmit}
          onChange={(e) => setFlag(e.target.value)}
          className="w-full bg-transparent border-none outline-none"
        />
      </div>
    </>
  );
};

export default HandleFlagEntry;
