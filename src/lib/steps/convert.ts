import type { TreeNode } from '$lib/types/TreeNode.js'
import { collapse } from '$lib/utils/collapse.js'
import { folding } from '$lib/utils/folding.js'

export const convert = (trees: TreeNode[]) => folding(trees.map((x) => collapse(x)))
