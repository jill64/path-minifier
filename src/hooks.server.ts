import { serverInit } from '@jill64/sentry-sveltekit-cloudflare'
import { onRender } from '@jill64/svelte-dark-theme'
import { attach } from '@jill64/svelte-ogp'
import { sequence } from '@sveltejs/kit/hooks'

const { onHandle, onError } = serverInit(
  'https://1c68b59245ed2ac47ffde03021b408fd@o4505814639312896.ingest.sentry.io/4506143354912768'
)

export const handle = onHandle(sequence(onRender(), attach))
export const handleError = onError()
