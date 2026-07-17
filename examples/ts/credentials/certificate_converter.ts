import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const certificatePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "developmentCertificate.p12");

const certificate = fs.readFileSync(certificatePath);
console.log(certificate.toString("base64"));
