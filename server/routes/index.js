const Router = require('express').Router
const items = require('../controller/Asset.js')

const router = new Router()

router.post('/asset', items.create)
router.get('/asset/:id', items.find)
router.get('/asset', items.findAll)
router.put('/asset/:id', items.update)
router.delete('/asset/:id', items.delete)

module.exports = router
