<script lang="ts">
  import { theme } from '@jill64/svelte-suite'
  import { ToggleSwitch } from '@jill64/svelte-suite/input'
  import type { Qparam } from '@jill64/svelte-suite'

  export let param: Qparam<boolean>
  export let label: string
  export let enable: boolean
</script>

<ToggleSwitch
  value={$param}
  padColor={enable ? 'white' : $theme === 'dark' ? '#BBB' : '#EEE'}
  onColor={enable
    ? $theme === 'dark'
      ? 'green'
      : 'limegreen'
    : $theme === 'dark'
      ? '#444'
      : 'lightgray'}
  offColor={enable
    ? $theme === 'dark'
      ? 'gray'
      : 'lightgray'
    : $theme === 'dark'
      ? '#444'
      : 'lightgray'}
  onChange={param.set}
  disabled={!enable}
>
  <span
    class="ml-2 font-semibold {enable
      ? ''
      : 'text-zinc-400 dark:text-zinc-500'}"
  >
    {label}
  </span>
</ToggleSwitch>
