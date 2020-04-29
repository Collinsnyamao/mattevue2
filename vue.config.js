process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var fs = require('fs');

module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    https: true
    https: {
      key: fs.readFileSync(__dirname+'/certs/apache-selfsigned.key'),
      cert: fs.readFileSync(__dirname+'/certs/apache-selfsigned.crt')
      /*ca: fs.readFileSync('/path/to/ca.pem'),*/
    }
  }
}
