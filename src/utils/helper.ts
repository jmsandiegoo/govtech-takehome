
export const gen_success_cmd_messsage = (commandWord: string, content: string) => `${commandWord} done: \n` + content;
export const gen_fail_cmd_message = (commandWord: string, errorMessage: string) => `${commandWord} failed: \n` + errorMessage;