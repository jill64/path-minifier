import type { Input, TreeNode } from '$lib/types/index.js'
import { pathListToTree } from '$lib/utils/to-tree.js'

export const preprocess = (input: Input): TreeNode[] =>
  input.every((x): x is string => typeof x === 'string')
    ? pathListToTree(input)
    : input
