var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

app.get('/search', function(req, res) {
	res.status(200);
	res.send('search page');
})

app.get('/result', function(req, res) {
	res.status(200);
	res.send('result page');
})

module.exports = {app};