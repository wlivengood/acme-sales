var server = require('http').createServer(require('./app'));

if(process.env.SYNC){
  require('../db').sync();
}

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log('Server is listening on port ' + port);
});
