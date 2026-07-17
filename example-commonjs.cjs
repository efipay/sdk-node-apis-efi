// Exemplo de uso com CommonJS (require)
const EfiPay = require('./dist/cjs/index.cjs');
const { EfiPay: NamedEfiPay } = require('./dist/cjs/index.cjs');

const options = {
    client_id: 'Client_Id_',
    client_secret: 'Client_Secret_',
    certificate: './certificado.p12',
    sandbox: false
};

const sdk1 = new EfiPay(options);
const sdk2 = new NamedEfiPay(options);

async function exemplo() {
    try {
        console.log('Testando CommonJS imports...');
        console.log('Import padrão e nomeado são a mesma classe:', EfiPay === NamedEfiPay);
        console.log('Instâncias diferentes:', sdk1 !== sdk2);
        console.log('Mesmo tipo de classe:', sdk1.constructor === sdk2.constructor);
        console.log('Método pixCreateImmediateCharge existe:', typeof sdk1.pixCreateImmediateCharge === 'function');
    } catch (error) {
        console.error('Erro:', error);
    }
}

if (require.main === module) {
    exemplo();
}

module.exports = { exemplo };
