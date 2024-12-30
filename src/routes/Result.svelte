<script lang="ts">
  let {
    tokens,
    text
  }: {
    tokens: number
    text: string
  } = $props()
</script>

<div class="flex gap-3">
  <span>
    <div class="text-zinc-500 dark:text-zinc-300 font-bold">Characters</div>
    <b class="text-2xl">{text.length}</b>
  </span>
  <span>
    <div class="text-zinc-500 dark:text-zinc-300 font-bold">LLM Tokens</div>
    <b class="text-2xl">{tokens}</b>
  </span>
</div>
