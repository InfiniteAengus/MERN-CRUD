const db = require('../models')
const Item = db.Assets
// const Op = db.Sequelize.Op

// Insert new item
exports.create = async (req, res) => {
  console.log(req.body)
  if (
    !req.body.image_url ||
    !req.body.title ||
    !req.body.description ||
    !req.body.creator
  ) {
    res.status(400).send({
      message: 'Missing Input',
    })
    return
  }

  const item = {
    image_url: req.body.image_url,
    title: req.body.title,
    description: req.body.description,
    creator: req.body.creator,
    is_deleted: false,
  }

  try {
    await Item.create(item)
    res.status(200).send({
      message: 'Success',
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while creating the Item.',
    })
  }
}

exports.find = async (req, res) => {
  const { id } = req.params

  try {
    let data
    data = await Item.findOne({ where: { id: id } })
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while reading data.',
    })
  }
}

exports.findAll = async (req, res) => {
  try {
    const data = await Item.findAll()

    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while reading data.',
    })
  }
}

exports.update = async (req, res) => {
  const id = req.params.id

  try {
    const num = await Item.update(req.body, { where: { id: id } })
    if (num === 1) {
      res.send({ message: 'Success' })
    } else {
      res.send({
        message: `Can't update item with id=${id}.Something has gone wrong!`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: `Can't update item with id=${id}`,
    })
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id

  try {
    const num = await Item.destroy({ where: { id: id } })
    if (num === 1) {
      res.send({
        message: 'Successfully deleted item!',
      })
    } else {
      res.send({
        message: `Something went wrong!Can't delete item with id=${id}.`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: "Can't delete item with id=" + id,
    })
  }
}
