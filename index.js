const responseTime = require('koa-response-time') //
const logger = require('koa-logger') //
// const router = require('koa-router')
const load = require('./lib/load')
const Koa = require('koa')
const path = require('path')

const env = process.env.NODE_ENV || 'development'

const app = new Koa()

if (env !== 'test') app.use(logger())

app.use(responseTime())
const routes = load(path.join(__dirname, '/api'))
app.use(routes.routes())
console.log()
// load(path.join(__dirname, '/api'))
app.listen(3000)
console.log('Listening on %s', 3000)
