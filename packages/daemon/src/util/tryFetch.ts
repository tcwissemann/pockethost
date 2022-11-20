import { dbg, error } from './logger'
import { safeCatch } from './promiseHelper'

export const tryFetch = safeCatch(
  `tryFetch`,
  (url: string) =>
    new Promise<void>((resolve, reject) => {
      const tryFetch = () => {
        dbg(`Trying to connect to instance ${url} `)
        fetch(url)
          .then(() => {
            dbg(`Connection to ${url} successful`)
            resolve()
          })
          .catch((e) => {
            error(`Could not connect to ${url}`)
            setTimeout(tryFetch, 1000)
          })
      }
      tryFetch()
    })
)
