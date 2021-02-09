const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist'),
};
module.exports = {
	entry: {
		"svg-map": `${paths.src}/index.js`,
		"svg-map.min": `${paths.src}/index.js`,
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
		}]
	},
	optimization: {
		minimize: true,
		minimizer: [new UglifyJsPlugin({
			include: /\.min\.js$/
		})]
	}
};
