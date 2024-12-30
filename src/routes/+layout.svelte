<script lang="ts">
  import { browser } from '$app/environment'
  import { OGP, ThemeManager, Toaster, flip, theme } from '@jill64/svelte-suite'
  import { MoonIcon, SunIcon } from '@jill64/svelte-suite/icons'
  import '../app.postcss'
  import GitHubLogo from './GitHubLogo.svelte'

  let { children } = $props()

  const title = 'PathMinifier'
  const description = 'Minify the path list while preserving semantics'

  let dark = $derived(theme.isDark)
</script>

<Toaster
  palette={{
    background: dark ? '#222' : '#EEE',
    text: dark ? '#EEE' : '#000',
    success: dark ? '#157a37' : '#29cf60',
    error: dark ? '#781e12' : '#cf3d29',
    secondary: dark ? '#DDD' : '#FFF',
    loading: dark ? '#555' : '#BBB'
  }}
/>
<ThemeManager />
<OGP
  {title}
  description="🔥 {description}"
  site_name={title}
  image="/og-image.png"
/>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="🔥 {description}" />
  {#if browser}
    <meta data-testid="hydrated" />
  {/if}
</svelte:head>

<header class="flex items-center justify-between gap-4">
  <hgroup class="flex flex-col gap-2">
    <h1 class="font-[BebasNeue] text-4xl font-bold">🔥 {title}</h1>
    <p class="text-zinc-600 dark:text-zinc-400">{description}</p>
  </hgroup>
  <button class="ml-auto rounded-full" onclick={flip.theme}>
    {#if dark}
      <SunIcon />
    {:else}
      <MoonIcon />
    {/if}
  </button>
  <a href="https://github.com/jill64/path-minifier">
    <GitHubLogo />
  </a>
</header>

{@render children()}
