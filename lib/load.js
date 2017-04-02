const debug = require('debug')('api')
const path = require('path')
const fs = require('fs')
const join = path.resolve
const readdir = fs.readdirSync
const Router = require('koa-router')
const routes = new Router()
const loader = (root) => {
  readdir(root).forEach((fileName) => {
    const file = join(root, fileName)
    const stats = fs.lstatSync(file)
    if (stats.isDirectory()) {
      return loader(file)
    } else {
      const Controller = require(file)
      route(Controller)
    }
  })
  return routes
}

function route (controller, prefix = '') {
  debug('routes: %s', controller)

  for (let key in controller) {
    const [method, route] = key.split(' ')
    debug('LOADING %s %s', method, route)
    const path = [prefix, route].join('/')
    routes[method.toLowerCase()](path, controller[key])
  }
}
module.exports = loader
