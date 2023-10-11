const Sequelize = require('sequelize');  
const { execSync } = require('child_process'); 
const config = require('./config');

function initDataBase() {
    const sequelize = new Sequelize(config.database, config.username, config.password, {  
        host: config.host,  
        dialect: config.dialect 
      });

    try {
      const output = execSync(`sequelize-auto -h ${config.host} -d ${config.database} -u ${config.username} -x ${config.password} -p ${config.port} --dialect ${config.dialect}`);
      console.log('result', output.toString());
    } catch (error) {
      console.error('error:', error);
      return;
    }
      const { initModels } = require('../models/init-models');
      const models = initModels(sequelize);
      return {
        sequelize,
        models
      }
}


module.exports = {
    initDataBase
}