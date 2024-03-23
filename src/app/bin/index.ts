export const SHELL_COMMANDS = ["leaderboard", "hint", "help", "flag", "whoami"];

export const SHELL_COMMANDS_RESPONSE: { [key: string]: string[] } = {
  hint: SHELL_COMMANDS,
  help: ["this is the help text", "another line of help text"],
  whoami: ["user information"],
  leaderboard: [''],
  flag: [''],
};
