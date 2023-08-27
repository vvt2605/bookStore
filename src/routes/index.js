

const siteRouter = require('./site')
const bookRouter = require('./books')

function route(app) {
    app.use('/books', bookRouter)
    app.use('/', siteRouter)
}

module.exports = route

