/**
 * Created by Marsellinus on 10/1/2015.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/app'));
app.listen(process.env.PORT || 3000);