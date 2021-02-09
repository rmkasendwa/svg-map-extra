const path = require('path');
const paths = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist'),
};
module.exports = {
	entry: [paths.src + '/index.js'],
	output: {
		path: paths.dist,
		filename: 'svg-map.js',
		library: 'svg-map',
		libraryTarget: 'umd',
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
	}
};
