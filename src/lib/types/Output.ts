import type { Collapsed } from './Collapsed.js'
import type { Options } from './Options.js'

export type Output<T extends Options> = T extends { output: 'object' }
  ? Collapsed
  : string
