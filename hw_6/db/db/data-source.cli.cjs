require('ts-node').register({
  compilerOptions: {
    module: 'CommonJS',
  },
});

const { AppDataSource } = require('./data-source.ts'); // путь к твоему TS DataSource

module.exports = AppDataSource;
