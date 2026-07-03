jest.mock('pix-qr-code-detail', () => ({
	getDecodedPixJwt: jest.fn(),
}))

jest.mock('axios', () => {
	const axios = jest.fn()
	axios.create = jest.fn(() => jest.fn())
	return axios
})

const axios = require('axios')
const { getDecodedPixJwt } = require('pix-qr-code-detail')
const EfiPayModule = require('../src/index')

const EfiPay = EfiPayModule.default || EfiPayModule

describe('pixQrCodeDetail local', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('decodifica o QR Code usando pix-qr-code-detail e retorna apenas payload', async () => {
		const payload = {
			tipoCob: 'cob',
			txid: 'txid-local',
			valor: { final: '10.00' },
		}
		getDecodedPixJwt.mockResolvedValue({
			header: { alg: 'none' },
			payload,
			signature: 'signature',
		})

		const efipay = new EfiPay({ sandbox: true, client_id: 'id', client_secret: 'secret' })
		const result = await efipay.pixQrCodeDetail({}, { pixCopiaECola: '000201...' })

		expect(getDecodedPixJwt).toHaveBeenCalledTimes(1)
		expect(getDecodedPixJwt).toHaveBeenCalledWith('000201...')
		expect(result).toStrictEqual(payload)
		expect(result).not.toHaveProperty('header')
		expect(result).not.toHaveProperty('signature')
		expect(axios).not.toHaveBeenCalled()
	})

	test('não chama Endpoints.run nem API/autenticação', async () => {
		getDecodedPixJwt.mockResolvedValue({ payload: { ok: true } })

		const efipay = new EfiPay({ sandbox: true, client_id: 'id', client_secret: 'secret' })
		const createCharge = jest.spyOn(efipay, 'createCharge')

		await efipay.pixQrCodeDetail({}, { pixCopiaECola: '000201...' })

		expect(createCharge).not.toHaveBeenCalled()
		expect(axios).not.toHaveBeenCalled()
	})

	test.each([
		undefined,
		null,
		{},
		{ pixCopiaECola: '' },
		{ pixCopiaECola: '   ' },
		{ pixCopiaECola: 123 },
	])('rejeita body inválido: %p', async (body) => {
		const efipay = new EfiPay({ sandbox: true, client_id: 'id', client_secret: 'secret' })

		await expect(efipay.pixQrCodeDetail({}, body)).rejects.toThrow('O campo "pixCopiaECola" é obrigatório e deve ser uma string.')
		expect(getDecodedPixJwt).not.toHaveBeenCalled()
		expect(axios).not.toHaveBeenCalled()
	})
})
