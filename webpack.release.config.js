const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlLoader = require("html-loader");
const tslintLoader = require("tslint-loader");


module.exports = {
	mode: 'production',
	devtool: 'inline-source-map',
	entry: {
		'./../src/xpathfinder': glob.sync("./src/scripts/**/*.ts", {
			ignore: ["./**/*.d.ts"]
		}).concat(["./src/styles/style.scss"])
	},
	output: {
		filename: '[name].js',
		libraryTarget: 'var',
		library: 'XPathFinder'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	],
	resolve: {
		extensions: ['.ts', '.js', '.css', '.scss']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
					loader: 'ts-loader',
					options: {
						onlyCompileBundledFiles: true,
					}
				}]
			},
			{
				test: /\.tsx?$/,
				enforce: 'pre',
				use: [
					{
						loader: 'tslint-loader',
						options: {
							configFile: "tslint.json",
							failOnHint: false
						}
					}
				]
			},
			{
				test: /\.(sass|scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							plugins: () => [
								require("autoprefixer")({
									browsers: ["> 1%", "last 2 versions"]
								})
							]
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	}
};