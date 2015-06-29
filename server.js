var config = require('./webpack.config'),
	webpack = require('webpack'),
	WebpackDevServer = require('webpack-dev-server'),
	express = require('express'),
	app = express(),
	request = require("request"),
	cheerio = require("cheerio");

var dev = process.env.DEV_PORT || 8080;
var port = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {

	publicPath: config.output.publicPath,
	contentBase: config.devServer.contentBase,
	hot: true,
	quiet: true

}).listen(dev, function (err, result) {
	
	if (err) return console.log(err);
	console.log('Listening at localhost:'+dev);
});

app.get('/parser', function (req, res) {
	
	var product = {};

	res.header('Access-Control-Allow-Origin', '*');
	
	request(req.query.url, function (error, response, body) {
		
		console.log('requsting ' + req.query.url);

		if (!error) {
		
			var $ = cheerio.load(body),
				
				product = {
				
					name: $(".product-info-name").text().trim(),
					img: $(".product-image-container").find('img').attr('src'),
					price: $(".product-price").text(),
					specifications: [],
					features: [],
				};

				var specifications = $(".prd-attributesList, .ui-listBulleted").children();

				Array.prototype.forEach.call(specifications, function(item) {
					product.specifications.push($(item).find('span').text());
				});

				var features = $(".simpleList, .uip").children();

				Array.prototype.forEach.call(features, function(item) {

					var name = $(item).text ? $(item).text().split(':')[0].trim() : $(item).find('span').text().split(':')[0].trim(),
						value = $(item).text ? $(item).text().split(':')[1].trim() : $(item).find('span').text().split(':')[1].trim();

					product.features.push({
						name: name,
						value: value,
					});
				});

			console.log('success ' + JSON.stringify(product, null, '\t'));

			res.send(product);

		} else {
			console.log("We’ve encountered an error: " + error);

			res.send({error: error});
		}
	});
});

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});