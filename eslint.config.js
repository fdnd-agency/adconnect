import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'

/**
 * ESLint configuratie volgens FDND conventies
 * Bron: https://docs.fdnd.nl/conventies.html
 * @type {import('eslint').Linter.Config[]}
 */
export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		ignores: ['.svelte-kit/', 'build/', 'node_modules/', 'coverage/', '**/*.config.js']
	},
	{
		// FDND Code Conventions
		rules: {
			// JavaScript conventies
			// - Single quotes voor strings
			'quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

			// - Geen semicolons aan het einde van regels
			'semi': ['warn', 'never'],

			// - 1 tab voor indentatie
			'indent': ['warn', 'tab'],

			// - Gebruik const tenzij hertoewijzing nodig is, vermijd var
			'prefer-const': 'warn',
			'no-var': 'error',

			// - camelCase voor variabelen en functies
			'camelcase': ['warn', { properties: 'never', ignoreDestructuring: true }],

			// - Template literals waar mogelijk
			'prefer-template': 'warn',

			// - Object destructuring
			'prefer-destructuring': [
				'warn',
				{
					array: false,
					object: true
				},
				{
					enforceForRenamedProperties: false
				}
			],

			// Code quality
			'no-unused-vars': [
				'warn',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],

			// Moderne arrow function syntax
			'arrow-body-style': ['warn', 'as-needed'],
			'prefer-arrow-callback': 'warn',

			// Spacing en formatting
			'object-curly-spacing': ['warn', 'always'],
			'array-bracket-spacing': ['warn', 'never'],
			'comma-dangle': ['warn', 'never'],
			'eol-last': ['warn', 'always'],
			'no-multiple-empty-lines': ['warn', { max: 2, maxEOF: 1 }],
			'no-trailing-spaces': 'warn',

			// Best practices
			'eqeqeq': ['warn', 'always'],
			'no-console': ['warn', { allow: ['error'] }],
			'no-debugger': 'warn'
		}
	},
	{
		// Config bestanden mogen afwijken
		files: ['**/*.config.js', '**/*.config.mjs'],
		rules: {
			'no-console': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.js'],
		languageOptions: {
			parser: svelteParser
		},
		rules: {
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'prefer-destructuring': 'off',
			'svelte/no-at-html-tags': 'off',
			'svelte/require-each-key': 'warn',
			'svelte/no-navigation-without-resolve': 'off'
		}
	}
]
