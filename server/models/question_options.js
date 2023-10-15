const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('question_options', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'question',
        key: 'question_id'
      }
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    options_order: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    option_text: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    question_type: {
      type: DataTypes.ENUM('SingleChoice','MultiChoice','True-False'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'question_options',
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
        name: "question_id",
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
    ]
  });
};
