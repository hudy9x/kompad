import { ECommandType, ICommand } from "../../types"

const isOption = (type: ECommandType) => type === ECommandType.OPTION
const isMatchedPresetOptions = (text: string, presetOptions: string[]) =>
  presetOptions.some((option) => option === text)

export const isOptionNMatchedPreset = (item: ICommand, preset: string[]) => {
  return isOption(item.type) && isMatchedPresetOptions(item.text, preset)
}
