const sql = require('mssql');
require('dotenv').config();

let poolPromise = null;

async function createPool() {
  if (poolPromise) return poolPromise;

  const config = {
    server: process.env.DB_SERVER, // e.g. AKSHAY1137\SQLEXPRESS (single backslash in .env)
    database: process.env.DB_DATABASE, // e.g. Sonocare
    user: process.env.DB_USER, // e.g. sa
    password: process.env.DB_PASSWORD, // e.g. 12345678
    pool: {
      max: parseInt(process.env.DB_POOL_MAX, 10) || 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // set to false for local dev
      trustServerCertificate: true,
      enableArithAbort: true,
    },
  };

  poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
      console.log('✅ Connected to SQL Server with SQL Auth');
      return pool;
    })
    .catch((err) => {
      poolPromise = null;
      const util = require('util');
      console.error('❌ Database Connection Failed:');
      console.error('Full Error:', util.inspect(err, { depth: 5 }));
      throw err;
    });

  return poolPromise;
}

module.exports = {
  getPool: createPool,
  sql,
};
