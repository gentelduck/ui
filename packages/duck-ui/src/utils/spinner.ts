import ora, { type Options } from 'ora'

export function spinner(
  text: Options['text'],
  options?: {
    silent?: boolean
  }
) {
  return ora({
    color: 'yellow',
    text,
    isSilent: options?.silent
  })
}
