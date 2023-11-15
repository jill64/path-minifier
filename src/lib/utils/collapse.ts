import type { Collapsed, TreeNode } from '$lib/types/index.js'
import { folding } from './folding.js'

export const collapse = ({ name, children }: TreeNode): Collapsed => {
  if (children.length === 0) {
    return name
  }

  const collapsed = children.map(collapse)
  const folded = folding(collapsed)

  if (typeof folded === 'string') {
    return `${name}/${folded}`
  }

  if (Array.isArray(folded)) {
    return children.length === 1
      ? folding(
          folded.map((path) =>
            typeof path === 'string'
              ? `${name}/${path}`
              : Array.isArray(path)
              ? path.map((x) => `${name}/${x}`)
              : Object.fromEntries(
                  Object.entries(path).map(([key, value]) => [
                    `${name}/${key}`,
                    value
                  ])
                )
          )
        )
      : { [name]: folded }
  }

  return children.length === 1
    ? Object.fromEntries(
        Object.entries(folded).map(([key, value]) => [`${name}/${key}`, value])
      )
    : { [name]: folded }
}
