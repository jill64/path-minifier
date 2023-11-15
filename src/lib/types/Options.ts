export type Options = {
  /**
   * Output type
   * - `object` Output as js object
   * ```js
   * [
   *   'README.md',
   *   'package.json',
   *   {
   *     src: [
   *       'index.js',
   *       '...'
   *     ]
   *   }
   * ]
   * ```
   *
   * - `json` Output as json
   * ```json
   * ["README.md","package.json",{"src": ["index.js","..."]}]
   * ```
   *
   * - `indented-list` Output as indented list
   * ```txt
   * README.md
   * package.json
   * src
   *   index.js
   *   ...
   *```
   * - `auto` Automatically selects the output with the fewest number of characters and returns the value as a string.
   * @default "auto"
   */
  output?: 'object' | 'json' | 'indented-list' | 'auto'
}
