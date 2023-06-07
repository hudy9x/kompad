type CopyFn = (text: string) => Promise<boolean>

export const useCopyToClipboard = (): CopyFn => {
  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      return false
    }
  }
  return copy
}
