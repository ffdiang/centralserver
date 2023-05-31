const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "sSuG0VXkTWvLHeUtbQ95",
    host: "containers-us-west-146.railway.app",
    port: 5560,
    database: "railway"

});



module.exports = pool;
