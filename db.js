const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "cJdgbgDEDwn2KfzwjDzV",
    host: "containers-us-west-146.railway.app",
    port: 5560,
    database: "railway"

});



module.exports = pool;
