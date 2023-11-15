import type { Collapsed } from '$lib/types/Collapsed.js'

export const makeIndentedList = (collapsed: Collapsed, indent = 0): string => {
  const indent_str = '\t'.repeat(indent)

  if (typeof collapsed === 'string') {
    return `${indent_str}${collapsed}`
  }

  if (Array.isArray(collapsed)) {
    return collapsed.map((x) => makeIndentedList(x, indent)).join('\n')
  }

  return Object.entries(collapsed)
    .map(
      ([key, value]) =>
        `${indent_str}${key}\n${makeIndentedList(value, indent + 1)}`
    )
    .join('\n')
}
