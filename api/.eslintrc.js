module.exports = {
	root: true,
	plugins: ["prettier"],
	parserOptions: {
		"ecmaVersion": 2018
	},
	extends: [
		"./.eslintRules.js",
		"plugin:prettier/recommended"
	],
	env: {
		node: true,
		es6: true,
		jest: true,
	},
	rules: {
		// add or modify rules
	},
}
