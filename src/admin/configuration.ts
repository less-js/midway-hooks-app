import { createConfiguration, hooks } from '@midwayjs/hooks'
import * as Koa from '@midwayjs/koa'
import * as jwt from '@midwayjs/jwt'
import bodyParser from 'koa-bodyparser'
import * as upload from '@midwayjs/upload'
import * as info from '@midwayjs/info'
import * as DefaultConfig from './config/config.default'
import * as ProdConfig from './config/config.prod'
import checkToken from './middleware/check-token'
import routerResponse from './middleware/router-response'

/**
 * setup midway server
 */
export default createConfiguration({
  conflictCheck: true, // 开启命名冲突检查
  imports: [
    Koa,
    upload,
    info,
    jwt,
    hooks({
      middleware: [bodyParser(), checkToken, routerResponse],
    }),
  ],
  importConfigs: [
    {
      default: DefaultConfig,
      prod: ProdConfig,
    },
    {
      default: {
        keys: 'session_keys',
      },
    },
  ],
})
