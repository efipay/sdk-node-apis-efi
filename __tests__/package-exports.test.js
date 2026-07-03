const fs = require('fs')
const os = require('os')
const path = require('path')
const ts = require('typescript')

const projectRoot = path.resolve(__dirname, '..')

describe('package exports', () => {
	test('suporta require via package exports e shim CJS da raiz', () => {
		const EfiPay = require('sdk-node-apis-efi')
		const RootShimEfiPay = require('../')
		const sdk = new EfiPay({ sandbox: true, client_id: 'id', client_secret: 'secret' })

		expect(EfiPay).toBe(RootShimEfiPay)
		expect([typeof EfiPay, typeof sdk.createCharge, typeof sdk.pixGenerateStaticQRCode, typeof sdk.pixQrCodeDetail].join(' ')).toBe('function function function function')
	})

	test('suporta import ESM via package exports', async () => {
		const { default: EfiPay } = await import('sdk-node-apis-efi')
		const sdk = new EfiPay({ sandbox: true, client_id: 'id', client_secret: 'secret' })

		expect([typeof EfiPay, typeof sdk.createCharge, typeof sdk.pixGenerateStaticQRCode, typeof sdk.pixQrCodeDetail].join(' ')).toBe('function function function function')
	})

	test('expõe typings para consumidores TypeScript', () => {
		const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'efi-sdk-types-'))

		try {
			const nodeModulesDir = path.join(tempDir, 'node_modules')
			fs.mkdirSync(nodeModulesDir, { recursive: true })
			fs.symlinkSync(projectRoot, path.join(nodeModulesDir, 'sdk-node-apis-efi'), 'dir')

			fs.writeFileSync(path.join(tempDir, 'index.ts'), [
				"import EfiPay from 'sdk-node-apis-efi'",
				"const sdk = new EfiPay({ sandbox: true, client_id: 'id', client_secret: 'secret' })",
				"sdk.createCharge({}, { items: [{ name: 'Product', value: 1000, amount: 1 }] })",
				"sdk.pixGenerateStaticQRCode({ chave: 'pix@example.com', merchantName: 'Loja', merchantCity: 'SAO PAULO' }).then((result) => {",
				"  const qrcode: string = result.qrcode",
				"  console.log(qrcode)",
				"})",
				"sdk.pixQrCodeDetail({}, { pixCopiaECola: '000201...' }).then((payload) => {",
				"  const decoded: Record<string, unknown> | string = payload",
				"  console.log(decoded)",
				"})",
			].join('\n'))

			const program = ts.createProgram([path.join(tempDir, 'index.ts')], {
				noEmit: true,
				strict: true,
				module: ts.ModuleKind.Node16,
				moduleResolution: ts.ModuleResolutionKind.Node16,
				target: ts.ScriptTarget.ES2022,
				skipLibCheck: true,
			})
			const diagnostics = ts.getPreEmitDiagnostics(program)
			const formattedDiagnostics = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
				getCanonicalFileName: (fileName) => fileName,
				getCurrentDirectory: () => tempDir,
				getNewLine: () => '\n',
			})

			expect(formattedDiagnostics).toBe('')
		} finally {
			fs.rmSync(tempDir, { recursive: true, force: true })
		}
	})
})
