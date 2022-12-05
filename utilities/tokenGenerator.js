const jwt = require("jsonwebtoken")
require('dotenv').config();


function tokenGenerator(admin_id) {
    const payload = {
        admin: admin_id
    }

    return jwt.sign(payload, process.env.jwtCentralSecret, { expiresIn: "1hr" })

}
module.exports = tokenGenerator;
