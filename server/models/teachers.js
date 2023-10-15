const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teachers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    division_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'divisions',
        key: 'id'
      }
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'universities',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
    }
  }, {
    sequelize,
    tableName: 'teachers',
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
        name: "uid",
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
      {
        name: "division_id",
        using: "BTREE",
        fields: [
          { name: "division_id" },
        ]
      },
    ]
  });
};
