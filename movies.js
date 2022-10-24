// ROUTER SETUP
const Router = require('koa-router')
const router = new Router({
    prefix: '/movies'
})
const movies = [
    {id: 1 , title: 'Harry Potter', release: 2001},
    {id: 2, title: 'Interstellar', release: 2014},
    {id: 3, title: 'Inception', release: 2010}
]

// ROUTES
router.get('/', context => { // GET all
    context.body = {
        status: 'success',
        message: movies
    }
})

router.get('/:id', context => { // GET by id
    const getMovie = movies.filter(mov => {
        if (mov.id == context.params.id) return true
    })

    if (getMovie.length) {
        context.body = getMovie[0]
    } else {
        context.response.status = 404
        context.body = {
            status: 'error',
            message: `Movie not found using ${context.params.id}`
        }
    }
})

router.post('/', context => { //POST
    if (
        !context.request.body.id ||
        !context.request.body.name ||
        !context.request.body.author
    ) {
        context.response.status = 400
        context.body = {
            status: 'error',
            message: 'Please enter the data'
        }
    } else {
        const newMovie = movies.push({
            id: context.request.body.id,
            name: context.request.body.name,
            author: context.request.body.author
        })
        context.response.status = 201
        context.body = {
            status: 'success',
            message: `New movie added with id:  ${context.request.body.id} & name: ${ctx.request.body.name}`
        }
    }
})

router.put('/update/:id', context => { // PUT
    if (
        !context.request.body.id ||
        !context.request.body.name ||
        !context.request.body.author
    ) {
        context.response.status = 400
        context.body = {
        status: 'error',
        message: 'Please enter the data'
        }
    } else {
        const id = context.params.id
        const index = movies.findIndex(movie => movie.id == id)
        movies.splice(index, 1, context.request.body)
        context.response.status = 201
        context.body = {
        status: 'success',
        message: `New movie updated with id: ${context.request.body.id} & name: ${ctx.request.body.name}`
        }
    }
})

router.delete('/delete/:id', context => { // DELETE
    const id = context.params.id
    const index = movies.findIndex(movie => movie.id == id)
    movies.splice(index, 1)
    context.response.status = 200
    context.body = {
        status: 'success',
        message: `Movie deleted with id: ${id}`
    }
})

module.exports = router