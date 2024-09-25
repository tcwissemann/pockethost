import { Request } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import vhost from 'vhost'
import { logger } from '../../../../../core/ioc'

export function createVhostProxyMiddleware(
  host: string,
  target: string,
  ws = false,
) {
  const { dbg } = logger()
  dbg(`Creating ${host}->${target}`)
  const handler = createProxyMiddleware({ target, ws, changeOrigin: ws })
  return vhost(host, (_req, res, next) => {
    const req = _req as unknown as Request
    const method = req.method
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl

    dbg(`${method} ${fullUrl} -> ${target}`)
    // @ts-ignore
    return handler(req, res, next)
  })
}
