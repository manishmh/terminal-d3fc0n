import useStore from "@/store/useStore";
import { Dispatch, SetStateAction, useState, useTransition } from "react";

type HandleFlagEntryProps = {
  setHistory: Dispatch<
    SetStateAction<{ command: string; response: string[] }[]>>,
    setShowQuestion: Dispatch<SetStateAction<boolean>>,
};

const HandleQuestion = ({
  setHistory,
  setShowQuestion
}: HandleFlagEntryProps) => {
  const [isPending, startTransition] = useTransition();
  const [answer, setAnswer] = useState("");
  const { token, setPlayer, player } = useStore()

  const handleFlagSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.code === "13") {
      startTransition( async () => {
        try {
          const response = await fetch("https://d3fcon-backend.onrender.com/submit/question", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ answer }),
          })
          const data = await response.json();

          if (response.status === 200) {
            const newCurrentQuest = player.currentQuest + 1;
            const updatedPlayer = {
              userName: player.userName,
              level: player.level,
              token: player.token,
              currentQuest: newCurrentQuest,
            }

            setPlayer(updatedPlayer)
            setHistory((prevHistory) => [...prevHistory, { command: "", response: [`answer: ${answer}`, data.message] }]);
          } else setHistory((prevHistory) => [...prevHistory, { command: "", response: [`answer: ${answer}` ,data.message] }]);

          setShowQuestion(true);
        } catch (error) {
          console.error(error)  
        }
      });
    }
  };

  return (
    <>
      {isPending && <div>checking answer...</div>}
      <div className="flex gap-1">
        <div>answer: </div>
        <input
          type="text"
          autoFocus
          spellCheck="false"
          value={answer}
          onKeyDown={handleFlagSubmit}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full bg-transparent border-none outline-none"
        />
      </div>
    </>
  );
};

export default HandleQuestion;