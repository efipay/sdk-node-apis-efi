const fs = require("node:fs");
const path = require("node:path");

const certificatePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "developmentCertificate.p12");

const certificate = fs.readFileSync(certificatePath);
console.log(certificate.toString("base64"));
