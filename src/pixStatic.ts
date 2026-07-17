import QRCode from 'qrcode';

export type StaticPixData = {
  chave: string;
  merchantName: string;
  merchantCity: string;
  transactionAmount?: number;
  txid?: string;
  infoAdicional?: string;
  oneTime?: boolean;
  merchantCategoryCode?: string;
  transactionCurrency?: number;
  countryCode?: string;
};

export type StaticPixResponse = {
  qrcode: string;
  imagemQrcode: string;
};

export function computeCRC(value: string) {
  const bytes = Buffer.from(value, 'utf8');
  let crc = 0xffff;

  for (const byte of bytes) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i += 1) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function tlv(tag: string, value: string) {
  return `${tag.padStart(2, '0')}${String(value.length).padStart(2, '0')}${value}`;
}

export function buildPixPayload({
  chave,
  merchantName,
  merchantCity,
  transactionAmount,
  txid = '***',
  infoAdicional,
  oneTime = false,
  merchantCategoryCode = '0000',
  transactionCurrency = 986,
  countryCode = 'BR',
}: StaticPixData) {
  if (!chave) throw new Error('A chave PIX e obrigatoria');
  if (!merchantName) throw new Error('O nome do recebedor e obrigatorio');
  if (!merchantCity) throw new Error('A cidade do recebedor e obrigatoria');

  let payload = tlv('00', '01');
  if (oneTime) {
    payload += tlv('02', '12');
  }

  let merchantAccountInfo = tlv('00', 'br.gov.bcb.pix');
  merchantAccountInfo += tlv('01', chave);
  if (infoAdicional) {
    merchantAccountInfo += tlv('02', infoAdicional);
  }

  payload += tlv('26', merchantAccountInfo);
  payload += tlv('52', merchantCategoryCode);
  payload += tlv('53', String(transactionCurrency).padStart(3, '0'));

  if (transactionAmount !== undefined && transactionAmount !== null) {
    const amount = transactionAmount.toFixed(2).replace(/\.00$/, '');
    payload += tlv('54', amount);
  }

  payload += tlv('58', countryCode);
  payload += tlv('59', merchantName);
  payload += tlv('60', merchantCity);
  payload += tlv('62', tlv('05', txid));
  payload += '6304';
  payload += computeCRC(payload);

  return payload;
}

export async function createStaticPix(options: StaticPixData): Promise<StaticPixResponse> {
  const payload = buildPixPayload(options);
  const svgString = await QRCode.toString(payload, {
    type: 'svg',
    errorCorrectionLevel: 'L',
    margin: 4,
  });

  return {
    qrcode: payload,
    imagemQrcode: `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`,
  };
}
