<script lang="ts">
  export let before: number
  export let after: number
  export let label: string

  const fix = (n: number) => (isNaN(n) || !isFinite(n) ? 0 : n)

  $: diff = after - before
  $: rate = fix((after / before - 1) * 100)
</script>

<span>
  <div class="flex gap-2">
    <span
      class="flex items-end gap-2 font-bold text-zinc-500 dark:text-zinc-300"
    >
      {label}
    </span>
    <span class="text-zinc-500 dark:text-zinc-400">
      {#if diff > 0}+{/if}{diff}
    </span>
  </div>
  <b
    class="text-3xl
    {rate > 0 ? 'text-red-500' : rate !== 0 ? 'text-green-500' : ''}"
  >
    {#if rate > 0}+{/if}{rate.toFixed(1)}%
  </b>
</span>
