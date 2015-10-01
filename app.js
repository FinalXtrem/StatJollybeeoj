/**
 * Created by Marsellinus on 10/1/2015.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/app'));
/*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
if ('OPTIONS' == req.method){
    return res.send(200);
}
next();
});*/
app.listen(process.env.PORT || 80);