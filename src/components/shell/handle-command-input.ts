import { Dispatch, SetStateAction } from "react";

const handleCommandInput = (
    shellInput: string, 
    setHistory: Dispatch<SetStateAction<{ command: string; response: string[] }[]>>, 
    router: any, 
    setBanner: Dispatch<SetStateAction<boolean>>, 
    setShowInput: Dispatch<SetStateAction<boolean>>
    ) => { 
    const input = shellInput.toLowerCase();
    console.log('input', input);

    switch (input) {
        case "leaderboard":
            window.open('https://google.com', '_blank');
            break;
        case "clear":
            setBanner(false);
            setHistory([])
            break;
        case "flag":
            setShowInput(false);
            break;
        default:
            break;
    }
};

export default handleCommandInput;