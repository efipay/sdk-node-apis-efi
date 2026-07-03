const constantsModule = require('../src/lib/constants')
const { AllMethods } = require('../src/methods')

const constants = constantsModule.default || constantsModule

const INTERNAL_ENDPOINTS = new Set(['authorize'])
const LOCAL_METHODS = new Set(['pixQrCodeDetail'])

function getPublicEndpointNames() {
	const endpoints = new Set()

	Object.values(constants.APIS).forEach((api) => {
		Object.keys(api.ENDPOINTS).forEach((name) => {
			if (!INTERNAL_ENDPOINTS.has(name)) {
				endpoints.add(name)
			}
		})
	})

	return [...endpoints].sort()
}

function getDocumentedMethodNames() {
	const methods = new Set()
	let prototype = AllMethods.prototype

	while (prototype && prototype !== Object.prototype) {
		Object.getOwnPropertyNames(prototype).forEach((name) => {
			if (name !== 'constructor' && typeof prototype[name] === 'function') {
				methods.add(name)
			}
		})
		prototype = Object.getPrototypeOf(prototype)
	}

	return [...methods].sort()
}

function buildMissingMessage(missingMethods) {

	return [
		'Endpoints em constants sem método documentado/tipado em src/methods:',
		...missingMethods.map((name) => `- ${name}`),
	].filter(Boolean).join('\n')
}

describe('paridade entre endpoints públicos e métodos tipados', () => {
	test('todo endpoint público em constants deve ter método documentado/tipado', () => {
		const endpointNames = getPublicEndpointNames()
		const documentedMethods = getDocumentedMethodNames()

		const missingMethods = endpointNames.filter((name) => !documentedMethods.includes(name))

		if (missingMethods.length > 0) {
			throw new Error(buildMissingMessage(missingMethods))
		}
	})

	test('todo método documentado/tipado deve existir em constants', () => {
		const endpointNames = getPublicEndpointNames()
		const documentedMethods = getDocumentedMethodNames()

		const extraMethods = documentedMethods.filter((name) => !endpointNames.includes(name) && !LOCAL_METHODS.has(name))

		expect(extraMethods).toEqual([])
	})
})
