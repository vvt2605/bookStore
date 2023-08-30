
const express =require('express')
const router = express.Router()

const siteController = require('../app/controller/SiteController')


router.post('/register', siteController.registerPost)
router.get('/register', siteController.register)
router.post('/login', siteController.loginPost)
router.get('/login', siteController.login)
router.get('/logout', siteController.logout)
router.get('/', siteController.home)

module.exports = router
