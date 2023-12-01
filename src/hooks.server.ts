import { serverInit } from '@jill64/sentry-sveltekit-cloudflare'
import { ogpAttach, onRender } from '@jill64/svelte-suite'
import { sequence } from '@sveltejs/kit/hooks'

const { onHandle, onError } = serverInit(
  'https://1c68b59245ed2ac47ffde03021b408fd@o4505814639312896.ingest.sentry.io/4506143354912768'
)

export const handle = onHandle(sequence(onRender(), ogpAttach))
export const handleError = onError()
