import useStore from "@/store/useStore";

export const SHELL_COMMANDS = ["ls", "hint", "help", "flag", "question", "status", "clear", "ls -l"];

export let SHELL_COMMANDS_RESPONSE: { [key: string]: string[] } = {
  ls: SHELL_COMMANDS,
  hint: [""],
  help: ["raise your hand and call nearest co-ordinator"],
  flag: [],
  question: [],
  status: [],
  clear: [],
  "ls -l": [
    "ls - List directory contents",
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
      question = "website url ?"
    } else if (player.currentQuest === 2) {
      question = "name of founder 1 ?"
    } else if (player.currentQuest === 3) {
      question = " inventor of steganography ?"
    };

    flag="ftp url ?"
    hint = `<a href='https://e-corp.live/' target="_blank" class="text-green-400 underline">fsociety welcome page</a>`;
  } else if (player.level === 2) {
    if (player.currentQuest === 4) {
      question = "wordlist name ? (hint: rock-you)"
    } else if (player.currentQuest === 5) {
      question = "api url ?"
    } else if (player.currentQuest === 6) {
      question = "correct password ?" 
    };

    flag="decrypted text ? hint - username: user"
    hint = `<a href='https://e-corp.live/login' target="_blank" class="text-green-400 underline">E-corp login address</a>`;
  } else if (player.level === 3) {
    if (player.currentQuest === 7) {
      question = "port ?"
    } else if (player.currentQuest === 8) {
      question = "wordlist name  ?"
    } else if (player.currentQuest === 9) {
      question = "password: "
    };

    flag="contents of root.txt ?"
    hint = `<a href='https://e-corp.live/dashboard' target="_blank" class="text-green-400 underline">E-corp server address</a>`;
  } else if (player.level === 4) {
    if (player.currentQuest === 10) {
      question = "filename ?"
    } else if (player.currentQuest === 11) {
      question = "encryption used ?"
    } else if (player.currentQuest === 12) {
      question = "best anime (hint: one piece)"
    } else if (player.currentQuest === 13) {
      question = "Enter the Flag for final level"
    }

    flag="encrypted alias "
    hint = `<a href='https://e-corp.live/vault' target="_blank" class="text-green-400 underline">E-corp vault address</a>`;
  }

  updateShellResponse("question", [question])
  updateShellResponse("flag", [flag])
  updateShellResponse("hint", [hint]);
  updateShellResponse("status", [status]);
};
