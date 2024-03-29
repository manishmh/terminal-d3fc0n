export const SHELL_COMMANDS = ["ls","leaderboard", "hint", "help", "flag", "whoami", "clear",];

export let SHELL_COMMANDS_RESPONSE: { [key: string]: string[] } = {
  ls: SHELL_COMMANDS,
  leaderboard: [],
  hint: ["hints go here"],
  help: ["this is the help text", "another line of help text"],
  flag: [],
  whoami: ["user information"],
  clear: [],
};

export const updateShellResponse = (key: string, newValue: string[]) => {
  SHELL_COMMANDS_RESPONSE = {
    ...SHELL_COMMANDS_RESPONSE,
    [key]: newValue, 
  };
};
