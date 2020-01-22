const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './index.tsx',
	devtool: "inline-source-map",
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.min.js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},

		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		})
	]
};