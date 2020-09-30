import express from "express"
import pinoHTTP from "pino-http"
import pino from "pino"
import config from './../config'

const router = express.Router()

router.use(pinoHTTP({
  useLevel: process.env.NODE_ENV === 'test' ? 'silent' : config.LOG_LEVEL,
  logger: pino({
    prettyPrint: { colorize: true }
  }),
  genReqId: (req) => { return `${req.id}` },
  serializers: {
    err: pino.stdSerializers.err,
    req: (req) => {
      return {
        At :`${new Date().toUTCString()} | ${Date.now()}`,
        Why : `${req.url}`, 
        Method: `${req.method}`,
        From: `${req.remoteAddress}:${req.remotePort}`,
        Headers: req.headers
      }
    },
    res: (res) => {
      if (process.env.NODE_ENV === 'test') return
      return {
        At :`${new Date().toUTCString()} | ${Date.now()}`,
        Why : `${res.raw.req.originalUrl}`,
        Code : `${res.statusCode}`
      }
    },
  },
  wrapSerializers: true
}))

export default router
