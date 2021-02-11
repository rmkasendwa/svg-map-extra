const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist'),
};
module.exports = {
	entry: {
		"svg-map": [`${paths.src}/index.js`, `${paths.src}/scss/main.scss`],
		"svg-map.min": [`${paths.src}/index.js`, `${paths.src}/scss/main.scss`]
	},
	devtool: "source-map",
	output: {
		path: paths.dist,
		filename: "[name].js",
		library: 'SVGMap',
		libraryExport: 'default',
		libraryTarget: 'umd',
		globalObject: 'this'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ["@babel/preset-env"],
					plugins: [
						"@babel/plugin-syntax-class-properties",
						"@babel/plugin-proposal-class-properties",
						"@babel/plugin-proposal-object-rest-spread"
					]
				}
			}
		}, {
			test: /.(scss|css)$/,
			exclude: /node_modules/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
		}]
	},
	optimization: {
		minimize: true,
		minimizer: [new UglifyJsPlugin({
			include: /\.min\.js$/
		}), new MiniCssExtractPlugin({
			filename: '[name].css'
		})]
	}
};