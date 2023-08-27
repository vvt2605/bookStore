
const  express = require('express')
const  router = express.Router()
const bookController = require('../app/controller/BookController')

router.get('/create', bookController.create)
router.get('/:id/edit', bookController.edit)
router.put('/:id', bookController.update)
router.delete('/:id', bookController.delete)
router.post('/store', bookController.store)
router.get('/list', bookController.list)

module.exports = router 

