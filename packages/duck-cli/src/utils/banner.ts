import kleur from 'kleur'
import pkg from '../../package.json'

export function bannerLines(version: string = pkg.version): [string, string] {
  const title = ` 🦆 @gentleduck/cli ${version}`
  return [title, '─'.repeat(title.length)]
}

export function printBanner() {
  const [title, rule] = bannerLines()
  console.log(`\n${kleur.white(title)}`)
  console.log(kleur.bold().green(rule))
}
