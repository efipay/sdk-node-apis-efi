const fs = require('fs')
const path = require('path')
const { AllMethods } = require('../src/methods')
const EfiPayModule = require('../src/index')

const EfiPay = EfiPayModule.default || EfiPayModule
const EXAMPLES_DIR = path.resolve(__dirname, '..', 'examples')
const IGNORED_DIRECTORIES = new Set(['node_modules', '.git'])

function getPrototypeMethods(prototype) {
	const methods = new Set()
	let current = prototype

	while (current && current !== Object.prototype) {
		Object.getOwnPropertyNames(current).forEach((name) => {
			if (name !== 'constructor' && typeof current[name] === 'function') {
				methods.add(name)
			}
		})
		current = Object.getPrototypeOf(current)
	}

	return methods
}

function getPublicMethodNames() {
	const methods = getPrototypeMethods(AllMethods.prototype)

	Object.getOwnPropertyNames(EfiPay.prototype).forEach((name) => {
		if (name !== 'constructor' && typeof EfiPay.prototype[name] === 'function') {
			methods.add(name)
		}
	})

	return [...methods].sort()
}

function getMaxDirectoryDepth(directory, currentDepth = 0) {
	return fs.readdirSync(directory, { withFileTypes: true }).reduce((maxDepth, entry) => {
		if (!entry.isDirectory() || IGNORED_DIRECTORIES.has(entry.name)) {
			return maxDepth
		}

		const childDirectory = path.join(directory, entry.name)
		return Math.max(maxDepth, getMaxDirectoryDepth(childDirectory, currentDepth + 1))
	}, currentDepth)
}

function collectFiles(directory, maxDepth, currentDepth = 0) {
	return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const fullPath = path.join(directory, entry.name)

		if (entry.isFile()) {
			return [fullPath]
		}

		if (entry.isDirectory() && currentDepth < maxDepth && !IGNORED_DIRECTORIES.has(entry.name)) {
			return collectFiles(fullPath, maxDepth, currentDepth + 1)
		}

		return []
	})
}

function getExampleNames() {
	const maxDepth = getMaxDirectoryDepth(EXAMPLES_DIR)
	const exampleFiles = collectFiles(EXAMPLES_DIR, maxDepth)

	return {
		maxDepth,
		names: new Set(exampleFiles.map((file) => path.basename(file, path.extname(file)))),
	}
}

function buildMissingExamplesMessage(missingMethods, maxDepth) {
	return [
		`Métodos públicos sem arquivo correspondente em examples (busca até a profundidade ${maxDepth}):`,
		...missingMethods.map((method) => `- ${method}`),
	].join('\n')
}

describe('paridade entre métodos públicos e exemplos', () => {
	test('todo método público deve ter um arquivo com seu nome em examples', () => {
		const methodNames = getPublicMethodNames()
		const { maxDepth, names: exampleNames } = getExampleNames()

		const missingExamples = methodNames.filter((method) => !exampleNames.has(method))

		if (missingExamples.length > 0) {
			throw new Error(buildMissingExamplesMessage(missingExamples, maxDepth))
		}
	})
})
