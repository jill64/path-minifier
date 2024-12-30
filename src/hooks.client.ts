import { clientInit } from '@jill64/sentry-sveltekit-cloudflare'
import { toast } from '@jill64/svelte-suite'

const onError = clientInit(
  'https://1c68b59245ed2ac47ffde03021b408fd@o4505814639312896.ingest.sentry.io/4506143354912768'
)

export const handleError = onError((e) => {
  if (e.error instanceof Error) {
    toast.error(e.error.message)
  }
})
