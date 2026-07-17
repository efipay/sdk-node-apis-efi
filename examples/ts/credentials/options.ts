import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SdkOptions } from "sdk-node-apis-efi";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sandbox = false;

const clientIdProd = "Client_Id_Prod";
const clientSecretProd = "Client_Secret_Prod";
const certificateProd = path.resolve(__dirname, "productionCertificate.p12");

const clientIdHomolog = "Client_Id_Homolog";
const clientSecretHomolog = "Client_Secret_Homolog";
const certificateHomolog = path.resolve(__dirname, "developmentCertificate.p12");

const options: SdkOptions = {
  client_id: sandbox ? clientIdHomolog : clientIdProd,
  client_secret: sandbox ? clientSecretHomolog : clientSecretProd,
  certificate: sandbox ? certificateHomolog : certificateProd,
  sandbox,
  cache: true,
};

export default options;
