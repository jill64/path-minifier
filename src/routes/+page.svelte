<script lang="ts">
  import { page } from '$app/state'
  import { minify } from '$lib/index.js'
  import { encodingForModel } from '@jill64/cf-tiktoken'
  import { defineQparam, storage, theme, toast } from '@jill64/svelte-suite'
  import {
    AlignLeftIcon,
    ClipboardIcon,
    CopyIcon,
    XIcon,
    ZapIcon
  } from '@jill64/svelte-suite/icons'
  import { ActionButton, Radio, ToggleSwitch } from '@jill64/svelte-suite/input'
  import { boolean, enums, string } from '@jill64/svelte-suite/serde'
  import Diff from './Diff.svelte'
  import Result from './Result.svelte'
  import { example } from './example.js'

  const extract = defineQparam({
    format: enums(['auto', 'json', 'list'] as const, 'auto'),
    pretty: boolean,
    space: boolean,
    wrap: boolean,
    indent: {
      serialize: (x: number) => x.toString(),
      deserialize: (x: string) => {
        const n = Number(x)
        return isNaN(n) || !isFinite(n) || n < 1 ? 1 : n
      }
    }
  })

  let { qparams: q } = $derived(extract(page.url))

  const localStorage = storage({ input: string })

  let input = $state(localStorage.input)

  $effect(() => {
    localStorage.input = input
  })

  let input_list = $derived(
    input
      .split('\n')
      .map((x) => x.trim())
      .filter((x) => x !== '')
  )

  let output = $derived(
    q.format === 'json'
      ? JSON.stringify(
          minify(input_list, {
            output: 'object'
          }),
          null,
          q.pretty ? (q.space ? q.indent : '\t'.repeat(q.indent)) : undefined
        )
      : q.format === 'auto'
        ? minify(input_list, {
            output: 'auto'
          })
        : minify(input_list, {
            output: 'indented-list'
          }).replaceAll('\t', (q.space ? ' ' : '\t').repeat(q.indent))
  )

  const enc = encodingForModel('gpt-4')

  let input_token = $derived(enc.encode(input).length)
  let output_token = $derived(enc.encode(output).length)
</script>

<aside class="flex flex-wrap justify-center items-center gap-8 my-4">
  <fieldset class="flex items-center justify-center gap-4">
    <legend>Format</legend>
    <Radio
      list={['auto', 'json', 'list']}
      bind:value={q.format}
      onSelect={(x) => {
        if (x === 'json' || x === 'list' || x === 'auto') {
          q.format = x
        }
      }}
    >
      {#snippet children(item)}
        <div class="ml-2 flex gap-2 items-center">
          {#if item === 'list'}
            <AlignLeftIcon />
          {:else if item === 'json'}
            <span class="font-semibold select-none">{'{ }'}</span>
          {:else}
            <ZapIcon />
          {/if}
          {item}
        </div>
      {/snippet}
    </Radio>
  </fieldset>
  <fieldset class="flex items-center justify-center gap-4">
    <legend
      class={q.format === 'auto' || (q.format === 'json' && !q.pretty)
        ? 'text-zinc-500'
        : ''}
    >
      Indent
    </legend>
    <Radio
      list={['1', '2', '4']}
      value={q.indent.toString()}
      disabled={q.format === 'auto' || (q.format === 'json' && !q.pretty)}
      onSelect={(x) => {
        if (x === '1' || x === '2' || x === '4') {
          q.indent = parseInt(x)
        }
      }}
    >
      {#snippet children(item)}
        <div
          class="ml-2 flex gap-2 items-center
        {q.format === 'auto' || (q.format === 'json' && !q.pretty)
            ? 'text-zinc-500'
            : ''}"
        >
          {item}
        </div>
      {/snippet}
    </Radio>
  </fieldset>
  {#snippet Toggle({
    param,
    label,
    enable
  }: {
    param: 'space' | 'pretty' | 'wrap'
    label: string
    enable: boolean
  })}
    <ToggleSwitch
      value={q[param]}
      padColor={enable ? 'white' : theme.isDark ? '#BBB' : '#EEE'}
      onColor={enable
        ? theme.isDark
          ? 'green'
          : 'limegreen'
        : theme.isDark
          ? '#444'
          : 'lightgray'}
      offColor={enable
        ? theme.isDark
          ? 'gray'
          : 'lightgray'
        : theme.isDark
          ? '#444'
          : 'lightgray'}
      onChange={(v) => (q[param] = v)}
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
  {/snippet}
  {@render Toggle({
    param: 'space',
    label: 'Use Space',
    enable: q.format === 'list' || (q.format === 'json' && q.pretty)
  })}
  {@render Toggle({
    param: 'pretty',
    label: 'Pretty',
    enable: q.format === 'json'
  })}
  {@render Toggle({ param: 'wrap', label: 'Wrap', enable: true })}
</aside>

<output class="flex justify-center gap-3 my-3">
  <Diff before={input.length} after={output.length} label="Characters" />
  <Diff before={input_token} after={output_token} label="LLM Tokens" />
</output>

<main class="grid gap-1 items-end">
  <hgroup
    class="flex flex-wrap items-center justify-start gap-2 [grid-area:in-head;]"
  >
    <h2>Input</h2>
    <ActionButton
      Class="font-bold"
      onClick={() =>
        toast.promise(
          navigator.clipboard.readText().then((text) => {
            input = text
          }),
          {
            loading: 'Pasting...',
            success: 'Pasted',
            error: 'Failed to paste'
          }
        )}
      label="Paste"
    >
      <ClipboardIcon size="20" />
    </ActionButton>
    <button
      class="flex items-center gap-1"
      onclick={() => {
        input = example
      }}
    >
      <AlignLeftIcon />
      Show Example
    </button>
    <button
      title="Clear"
      class="flex items-center gap-1 ml-auto text-zinc-600 dark:text-zinc-400"
      onclick={() => {
        input = ''
      }}
    >
      <XIcon />
    </button>
  </hgroup>
  <article class="[grid-area:in;]">
    <textarea
      bind:value={input}
      class={q.wrap ? '' : 'whitespace-pre'}
      placeholder="foo.txt
bar.json
path/baz.txt
path/to/qux.txt
path/to/file/quux.txt
..."
    ></textarea>
    <Result tokens={input_token} text={input} />
  </article>
  <hgroup class="flex items-center self-start gap-2 [grid-area:out-head;]">
    <h2>Output</h2>
    <ActionButton
      Class="font-bold"
      onClick={() =>
        toast.promise(navigator.clipboard.writeText(output), {
          loading: 'Copying...',
          success: 'Copied',
          error: 'Failed to copy'
        })}
      label="Copy"
    >
      <CopyIcon size="20" />
    </ActionButton>
  </hgroup>
  <output class="[grid-area:out;]">
    <textarea class={q.wrap ? '' : 'whitespace-pre'} value={output} readonly
    ></textarea>
    <Result tokens={output_token} text={output} />
  </output>
</main>

<footer class="my-4">
  <small class="text-zinc-500">
    LLM Tokens are calculated by
    <a
      class="text-blue-500 hover:underline"
      href="https://github.com/dqbd/tiktoken#readme"
    >
      js-tiktoken
    </a> with model GPT-4.
  </small>
</footer>

<style>
  main {
    grid-template:
      'in-head out-head'
      'in out';
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 640px) {
    main {
      grid-template:
        'in-head'
        'in'
        'out-head'
        'out';
      grid-template-columns: 1fr;
    }
  }
</style>
