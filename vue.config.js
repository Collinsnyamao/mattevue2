module.exports = {
  devServer: {
    disableHostCheck: true,
    https: {
      key: fs.readFileSync(__dirname+'/certs/apache-selfsigned.key'),
      cert: fs.readFileSync(__dirname+'/certs/apache-selfsigned.crt')
      /*ca: fs.readFileSync('/path/to/ca.pem'),*/
    }
  }
}
