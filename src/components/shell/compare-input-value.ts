import { SHELL_COMMANDS_RESPONSE } from "@/app/bin";

export const CompareInputValue = ({ input }: { input: string }) => {
    const cmd = input.trim();
    return Object.keys(SHELL_COMMANDS_RESPONSE).includes(cmd);
}
