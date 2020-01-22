module.exports = {
	devtool: "source-map",

	resolve: {
		extensions: [".ts", ".tsx"]
	},

	entry : "./index.tsx",
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
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	}
};