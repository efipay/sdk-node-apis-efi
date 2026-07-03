jest.mock('axios', () => {
	const axios = jest.fn()
	axios.create = jest.fn()
	return axios
})

const axios = require('axios')
const constantsModule = require('../src/lib/constants')
const EndpointsModule = require('../src/lib/endpoints')

const constants = constantsModule.default || constantsModule
const Endpoints = EndpointsModule.default || EndpointsModule

const baseOptions = {
	sandbox: true,
	client_id: 'client-id',
	client_secret: 'client-secret',
	cache: true,
}

function setupEndpoints() {
	const requestMock = jest.fn().mockResolvedValue({ data: { ok: true } })
	const mockAgent = { mockAgent: true }

	axios.create.mockReturnValue(requestMock)
	axios.mockImplementation((config) => Promise.resolve({
		data: {
			access_token: `token:${config.url}`,
			expires_in: 3600,
		},
	}))

	const endpoints = new Endpoints({ ...baseOptions }, constants)
	endpoints.createHttpsAgent = jest.fn(() => mockAgent)

	return { endpoints, requestMock, mockAgent }
}

beforeEach(() => {
	jest.clearAllMocks()
})

describe('Endpoints authentication cache', () => {
	test('mantém cache de autenticação separado por baseUrl', async () => {
		const { endpoints, requestMock } = setupEndpoints()

		await endpoints.run('createCharge', {}, { items: [] })
		await endpoints.run('pixCreateCharge', { txid: 'tx-123' }, { valor: { original: '1.00' } })
		await endpoints.run('createCharge', {}, { items: [] })

		expect(axios).toHaveBeenCalledTimes(2)
		expect(axios.mock.calls.map(([config]) => config.url)).toEqual([
			'https://cobrancas-h.api.efipay.com.br/v1/authorize',
			'https://pix-h.api.efipay.com.br/oauth/token',
		])

		const requestHeaders = requestMock.mock.calls.map(([request]) => request.headers.Authorization)
		expect(requestHeaders).toEqual([
			'Bearer token:https://cobrancas-h.api.efipay.com.br/v1/authorize',
			'Bearer token:https://pix-h.api.efipay.com.br/oauth/token',
			'Bearer token:https://cobrancas-h.api.efipay.com.br/v1/authorize',
		])
	})

	test('chamadas concorrentes usam contexto local de API sem sobrescrever estado', async () => {
		const { endpoints, requestMock, mockAgent } = setupEndpoints()

		await Promise.all([
			endpoints.run('createCharge', {}, { items: [] }),
			endpoints.run('pixCreateCharge', { txid: 'tx-concurrent' }, { valor: { original: '1.00' } }),
		])

		const requests = requestMock.mock.calls.map(([request]) => request)
		const defaultRequest = requests.find((request) => request.url.includes('/v1/charge'))
		const pixRequest = requests.find((request) => request.url.includes('/v2/cob/tx-concurrent'))

		expect(defaultRequest.url).toBe('https://cobrancas-h.api.efipay.com.br/v1/charge')
		expect(defaultRequest.httpsAgent).toBeUndefined()
		expect(pixRequest.url).toBe('https://pix-h.api.efipay.com.br/v2/cob/tx-concurrent')
		expect(pixRequest.httpsAgent).toBe(mockAgent)

		expect(endpoints.auth).toBeUndefined()
		expect(endpoints.authError).toBeUndefined()
		expect(endpoints.baseUrl).toBeUndefined()
		expect(endpoints.authRoute).toBeUndefined()
		expect(endpoints.params).toBeUndefined()
		expect(endpoints.agent).toBeUndefined()
	})

	test('gera x-idempotency-key por request de Open Finance', async () => {
		const { endpoints, requestMock } = setupEndpoints()

		await endpoints.run('ofStartPixPayment', {}, { pagador: {} })
		await endpoints.run('ofListParticipants', { nome: 'Banco Teste' })

		expect(axios).toHaveBeenCalledTimes(1)
		expect(axios.mock.calls[0][0].url).toBe('https://openfinance-h.api.efipay.com.br/v1/oauth/token')

		const idempotencyKeys = requestMock.mock.calls.map(([request]) => request.headers['x-idempotency-key'])
		expect(idempotencyKeys).toHaveLength(2)
		idempotencyKeys.forEach((key) => {
			expect(key).toMatch(/^[A-Za-z0-9]{72}$/)
		})
		expect(new Set(idempotencyKeys).size).toBe(2)
	})
})
