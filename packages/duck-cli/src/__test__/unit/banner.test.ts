import { describe, expect, it } from 'vitest'
import { bannerLines } from '../../utils/banner'

describe('bannerLines', () => {
  it('names the package by its npm name', () => {
    expect(bannerLines('1.2.3')[0]).toBe(' 🦆 @gentleduck/cli 1.2.3')
  })

  it('underlines the title to its width', () => {
    const [title, rule] = bannerLines('1.2.3')
    expect(rule).toBe('─'.repeat(title.length))
  })
})
