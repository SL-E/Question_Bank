const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    tid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teachers',
        key: 'id'
      }
    },
    division_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'courses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "tid",
        using: "BTREE",
        fields: [
          { name: "tid" },
        ]
      },
    ]
  });
};
