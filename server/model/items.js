module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define('item', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image_url: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  })
  return Item
}
