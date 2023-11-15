import type { Collapsed, Options, Output } from '$lib/types/index.js'
import { makeIndentedList } from '$lib/utils/make-indented-list.js'

export const postprocess = <O extends Options>(
  collapsed: Collapsed,
  options?: O
): Output<O> => {
  const { output = 'auto' } = options ?? {}

  const json = JSON.stringify(collapsed)
  const list = makeIndentedList(collapsed)

  const result =
    output === 'object'
      ? collapsed
      : output === 'json'
        ? json
        : output === 'indented-list'
          ? list
          : json.length < list.length
            ? json
            : list

  return result as Output<O>
}
