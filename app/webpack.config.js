const path = require("path");
const moment = require('moment');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: './index.tsx',
	devtool: "inline-source-map",
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'build.min.js?' + moment().unix()
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader"
					}
				]
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
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
	],
	performance: {
		hints: false
	}
};