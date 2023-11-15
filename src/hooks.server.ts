import { PUBLIC_SENTRY_DSN } from '$env/static/public'
import { serverInit } from '@jill64/sentry-sveltekit-cloudflare'
import { onRender } from '@jill64/svelte-dark-theme'
import { attach } from '@jill64/svelte-ogp'
import { sequence } from '@sveltejs/kit/hooks'

const { onHandle, onError } = serverInit(PUBLIC_SENTRY_DSN)

export const handle = onHandle(sequence(onRender(), attach))
export const handleError = onError()
