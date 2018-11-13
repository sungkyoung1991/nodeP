var express = require('express');
var http = require('http');
var static  = require('serve-static')
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session= require('express-session');
var expressErrorHandler = require('express-error-handler');
var user = require('./routes/user');
var config = require('./config/config');
var database_loader = require('./database/database_loader');
var router_loader = require('./routes/route_loader');
var crypto = require('crypto');

//passport 사용 ....
var passport = require('passport');
var flash = require('connect-flash');



var app = express(); 

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
// app.set('view engine', 'pug');

console.log('config.server_port -> ' + config.server_port);

app.set('port', config.server_port || 3000);
app.use('/public',static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    secret : 'my key',
    resave:true,
    saveUninitialized:true

}));

router_loader.init(app,express.Router());

// 패스포트 초기화...
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


var configPassport = require('./config/passport');
configPassport(app, passport);


var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});



app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('express web server start... : '  + app.get('port'));

    database_loader.init(app,config);
    
}); 