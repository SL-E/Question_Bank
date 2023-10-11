const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('question', {
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    question_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    question_status: {
      type: DataTypes.ENUM('Ready','Pending'),
      allowNull: false
    },
    courses_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modified_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    modified_author: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    time_estimate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'question',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
    ]
  });
};
