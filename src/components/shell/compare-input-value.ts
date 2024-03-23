import { SHELL_COMMANDS } from "@/app/bin";

export const CompareInputValue = ({ input }: { input: string }) => {
    const cmd = input.trim();
    return SHELL_COMMANDS.includes(cmd);
}