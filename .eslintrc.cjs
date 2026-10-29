module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:storybook/recommended",
        "prettier"
    ],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
			rules: {
				semi: ['error', 'never'],
			},
		},
		{
			// Storybook demo files and project-data files intentionally
			// co-locate a case study/demo's component(s) with the
			// constants, styles, and helpers that belong to it, instead
			// of one-component-per-file. That's a deliberate project
			// convention, not an oversight — so this rule (which only
			// matters for Vite's dev-mode Fast Refresh, not production
			// behavior) doesn't apply well here.
			files: ['stories/**/*.{ts,tsx}', 'src/data/projects/**/*.{ts,tsx}'],
			rules: {
				'react-refresh/only-export-components': 'off',
			},
		},
	],
}
