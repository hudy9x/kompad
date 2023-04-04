export enum ECommandType {
  COMMAND = "COMMAND",
  OPTION = "OPTION",
  CONTENT = "CONTENT",
}

export interface ICommand {
  type: ECommandType
  text: string
}

export type CommandFunc = () => {
  execute: (commands: ICommand[]) => Promise<void>
}
