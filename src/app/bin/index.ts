import useStore from "@/store/useStore";

export const SHELL_COMMANDS = ["ls", "leaderboard", "hint", "help", "flag", "question", "status", "clear"];

export let SHELL_COMMANDS_RESPONSE: { [key: string]: string[] } = {
  ls: SHELL_COMMANDS,
  leaderboard: [],
  hint: [""],
  help: ["to be implemented"],
  flag: [],
  question: [],
  status: [],
  clear: [],
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

  // Set hint and status based on player's level
  if (player.level === 1) {
    hint = `<a href='https://evilcorp-pi.vercel.app/' target="_blank" class="text-green-400 underline">fsociety welcome page</a>`;
  } else if (player.level === 2) {
    hint = `<a href='https://evilcorp-pi.vercel.app/login' target="_blank" class="text-green-400 underline">E-corp login address</a>`;
  } else if (player.level === 3) {
    hint = `<a href='https://evilcorp-pi.vercel.app/dashboard' target="_blank" class="text-green-400 underline">E-corp server address</a>`;
  } else if (player.level === 4) {
    hint = `<a href='https://evilcorp-pi.vercel.app/vault' target="_blank" class="text-green-400 underline">E-corp vault address</a>`;
  }

  updateShellResponse("hint", [hint]);
  updateShellResponse("status", [status]);
};