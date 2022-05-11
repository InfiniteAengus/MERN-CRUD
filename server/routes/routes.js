module.exports = (app) => {
  const items = require('../controller/item.js')

  const router = require('express').Router()

  app.use('/item', router)

  router.post('/', items.create)
  router.get('/', items.findAll)
  router.put('/:id', items.update)
  router.delete('/:id', items.delete)
}
