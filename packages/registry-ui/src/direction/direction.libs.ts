import { DIRECTION_DICTIONARY, type IDirection } from '@gentleduck/primitives/direction'

/** Narrow `dir` to `IDirection.Kind` via {@link DIRECTION_DICTIONARY}; invalid → undefined. */
export function toDirection(dir: unknown): IDirection.Kind | undefined {
  // Compare values, not keys: `in` also matches inherited keys such as `toString`.
  return dir === DIRECTION_DICTIONARY.ltr || dir === DIRECTION_DICTIONARY.rtl ? dir : undefined
}
