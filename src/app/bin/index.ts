import useStore from "@/store/useStore";

export const SHELL_COMMANDS = ["ls", "leaderboard", "hint", "help", "flag", "question", "status", "clear", "ls -l"];

export let SHELL_COMMANDS_RESPONSE: { [key: string]: string[] } = {
  ls: SHELL_COMMANDS,
  leaderboard: [],
  hint: [""],
  help: ["raise your hand and call nearest co-ordinator"],
  flag: [],
  question: [],
  status: [],
  clear: [],
  "ls -l": [
    "ls - List directory contents",
    "leaderboard - Show the current leaderboard",
    "hint - Get a hint",
    "help - Display help information",
    "flag - Submit a flag",
    "question - Submit a question",
    "status - Show user status",
    "clear - Clear the screen",
  ],
};

// Function to update shell response
export const updateShellResponse = (key: string, newValue: string[]) => {
  SHELL_COMMANDS_RESPONSE = {
    ...SHELL_COMMANDS_RESPONSE,
    [key]: newValue,
  };
};

// Function to set hint and status based on player's level
export const MyComponent = () => {
  const { player } = useStore();

  let hint = "";
  let status = `level: ${player.level} </br> current question: ${player.currentQuest} </br> Score: ${player.score}`;
  let question = "";
  let flag = "";

  // Set hint and status based on player's level
  if (player.level === 1) {
    if (player.currentQuest === 1) {
      question = "Where did you find the data ?"
    } else if (player.currentQuest === 2) {
      question = "What was the encryption used ?"
    } else if (player.currentQuest === 3) {
      question = ""
    };

    flag="what was the encrypted flag ?"
    hint = `<a href='https://evilcorp-pi.vercel.app/' target="_blank" class="text-green-400 underline">fsociety welcome page</a>`;
  } else if (player.level === 2) {
    if (player.currentQuest === 4) {
      question = "Command used to fetch ?"
    } else if (player.currentQuest === 5) {
      question = "The type of file you fetched ?"
    } else if (player.currentQuest === 6) {
      question = ""
    };

    flag="What was the password ?"
    hint = `<a href='https://evilcorp-pi.vercel.app/login' target="_blank" class="text-green-400 underline">E-corp login address</a>`;
  } else if (player.level === 3) {
    if (player.currentQuest === 7) {
      question = "encryption used for the text ?"
    } else if (player.currentQuest === 8) {
      question = "how did you SSH into server ?"
    } else if (player.currentQuest === 9) {
      question = ""
    };

    flag="content of root.txt ?"
    hint = `<a href='https://evilcorp-pi.vercel.app/dashboard' target="_blank" class="text-green-400 underline">E-corp server address</a>`;
  } else if (player.level === 4) {
    if (player.currentQuest === 10) {
      question = "Type of file provided ?"
    } else if (player.currentQuest === 11) {
      question = "which step updates the vault ?"
    } else if (player.currentQuest === 12) {
      question = ""
    };

    flag=""
    hint = `<a href='https://evilcorp-pi.vercel.app/vault' target="_blank" class="text-green-400 underline">E-corp vault address</a>`;
  }

  updateShellResponse("question", [question])
  updateShellResponse("flag", [flag])
  updateShellResponse("hint", [hint]);
  updateShellResponse("status", [status]);
};