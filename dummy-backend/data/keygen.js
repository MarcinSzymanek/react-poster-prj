const crypto = require("crypto");

const secret = crypto.randomBytes(32).toString("hex");
console.log("Generated new secret key (32b): ");
console.log(secret);
