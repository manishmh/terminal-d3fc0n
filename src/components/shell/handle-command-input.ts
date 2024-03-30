import { Dispatch, SetStateAction } from "react";

const handleCommandInput = (
    shellInput: string, 
    setHistory: Dispatch<SetStateAction<{ command: string; response: string[] }[]>>, 
    setBanner: Dispatch<SetStateAction<boolean>>, 
    setShowInput: Dispatch<SetStateAction<boolean>>,
    setShowQuestion: (showQuestion: boolean) => void
    ) => { 
    const input = shellInput.toLowerCase();

    switch (input) {
        case "leaderboard":
            window.open('https://lb-d3fc0n.vercel.app/', '_blank');
            break;
        case "clear":
            setBanner(false);
            setHistory([])
            break;
        case "flag":
            setShowInput(false);
            break;
        case "question":
            setShowQuestion(false);
            break;
        default:
            break;
    }
};

export default handleCommandInput;
