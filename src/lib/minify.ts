import { convert } from './steps/convert.js'
import { postprocess } from './steps/postprocess.js'
import { preprocess } from './steps/preprocess.js'
import type { Options, Output } from './types/index.js'
import type { Input } from './types/Input.js'

export const minify = <O extends Options>(
  input: Input,
  options?: O
): Output<O> => {
  const trees = preprocess(input)
  const result = convert(trees)
  const output = postprocess(result, options)
  return output
}
