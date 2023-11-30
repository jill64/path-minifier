<script lang="ts">
  import { page } from '$app/stores'
  import { minify } from '$lib/index.js'
  import { encodingForModel } from '@jill64/cf-tiktoken'
  import { ActionButton, Radio } from '@jill64/svelte-input'
  import { storage } from '@jill64/svelte-storage'
  import { string } from '@jill64/svelte-storage/serde'
  import { toast } from '@jill64/svelte-toast'
  import {
    AlignLeftIcon,
    ClipboardIcon,
    CopyIcon,
    XIcon,
    ZapIcon
  } from 'svelte-feather-icons'
  import { define } from 'svelte-qparam'
  import { boolean, enums } from 'svelte-qparam/serde'
  import Diff from './Diff.svelte'
  import Result from './Result.svelte'
  import Toggle from './Toggle.svelte'
  import { example } from './example.js'

  const extract = define({
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

  $: ({ qparams } = extract($page.url))

  const stored_input = storage('input', string)

  let input = $stored_input

  $: $stored_input = input

  $: ({ format, pretty, space, indent, wrap } = qparams)

  $: input_list = input
    .split('\n')
    .map((x) => x.trim())
    .filter((x) => x !== '')

  $: output =
    $format === 'json'
      ? JSON.stringify(
          minify(input_list, {
            output: 'object'
          }),
          null,
          $pretty ? ($space ? $indent : '\t'.repeat($indent)) : undefined
        )
      : $format === 'auto'
        ? minify(input_list, {
            output: 'auto'
          })
        : minify(input_list, {
            output: 'indented-list'
          }).replaceAll('\t', ($space ? ' ' : '\t').repeat($indent))

  const enc = encodingForModel('gpt-4')

  $: input_token = enc.encode(input).length
  $: output_token = enc.encode(output).length
</script>

<aside class="flex flex-wrap justify-center items-center gap-8 my-4">
  <fieldset class="flex items-center justify-center gap-4">
    <legend>Format</legend>
    <Radio
      list={['auto', 'json', 'list']}
      bind:value={$format}
      onSelect={(x) => {
        if (x === 'json' || x === 'list' || x === 'auto') {
          $format = x
        }
      }}
      let:item
    >
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
    </Radio>
  </fieldset>
  <fieldset class="flex items-center justify-center gap-4">
    <legend
      class={$format === 'auto' || ($format === 'json' && !$pretty)
        ? 'text-zinc-500'
        : ''}
    >
      Indent
    </legend>
    <Radio
      list={['1', '2', '4']}
      value={$indent.toString()}
      disabled={$format === 'auto' || ($format === 'json' && !$pretty)}
      onSelect={(x) => {
        if (x === '1' || x === '2' || x === '4') {
          $indent = parseInt(x)
        }
      }}
      let:item
    >
      <div
        class="ml-2 flex gap-2 items-center
        {$format === 'auto' || ($format === 'json' && !$pretty)
          ? 'text-zinc-500'
          : ''}"
      >
        {item}
      </div>
    </Radio>
  </fieldset>
  <Toggle
    param={space}
    label="Use Space"
    enable={$format === 'list' || ($format === 'json' && $pretty)}
  />
  <Toggle param={pretty} label="Pretty" enable={$format === 'json'} />
  <Toggle param={wrap} label="Wrap" enable={true} />
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
        $toast.promise(
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
      on:click={() => {
        input = example
      }}
    >
      <AlignLeftIcon />
      Show Example
    </button>
    <button
      title="Clear"
      class="flex items-center gap-1 ml-auto text-zinc-600 dark:text-zinc-400"
      on:click={() => {
        input = ''
      }}
    >
      <XIcon />
    </button>
  </hgroup>
  <article class="[grid-area:in;]">
    <textarea
      bind:value={input}
      class={$wrap ? '' : 'whitespace-pre'}
      placeholder="foo.txt
bar.json
path/baz.txt
path/to/qux.txt
path/to/file/quux.txt
..."
    />
    <Result tokens={input_token} text={input} />
  </article>
  <hgroup class="flex items-center self-start gap-2 [grid-area:out-head;]">
    <h2>Output</h2>
    <ActionButton
      Class="font-bold"
      onClick={() =>
        $toast.promise(navigator.clipboard.writeText(output), {
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
    <textarea class={$wrap ? '' : 'whitespace-pre'} value={output} readonly />
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
