// SETUP
const Koa = require('koa')
const router = require('koa-router')
const koaBody = require('koa-body')
const app = new Koa()
app.use(koaBody())
const products = require('./movies.js')
app.use(products.routes())

// SERVER ON
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`KOA server running. PORT: ${PORT}`)
})
server.on('error', error => console.log('Error en el servidor:', error))