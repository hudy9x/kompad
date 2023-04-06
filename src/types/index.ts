export enum ECommandType {
  COMMAND = "COMMAND",
  OPTION = "OPTION",
  CONTENT = "CONTENT",
}

export interface ICommand {
  type: ECommandType
  text: string
}

export interface ICommandSuggestItem {
  title: string
  desc: string
}

export interface ICommandOptions {
  [key: string]: string[]
}

export type CommandFunc = () => {
  execute: (commands: ICommand[]) => Promise<void>
  hasSuggestValue?: (command: ICommand) => string
  suggestOptionValue?: (option: string, value: string) => ICommandSuggestItem[]
  commandOptions: ICommandOptions
}
