import type { Collapsed } from '$lib/types/Collapsed.js'

type T = { arr: Collapsed[]; obj: { [key: string]: Collapsed } }

const fold = ({ arr, obj }: T, cur: Collapsed): T =>
  Array.isArray(cur)
    ? cur.reduce(fold, { arr, obj })
    : typeof cur === 'string'
      ? { arr: [...arr, cur], obj }
      : { arr, obj: { ...obj, ...cur } }

export const folding = (list: Collapsed[]) => {
  const { arr, obj } = list.reduce(fold, {
    arr: [],
    obj: {}
  })

  const obj_keys = Object.keys(obj)

  return arr.length && obj_keys.length
    ? [...arr, obj]
    : obj_keys.length
      ? obj
      : arr.length === 1
        ? arr[0]
        : arr
}
