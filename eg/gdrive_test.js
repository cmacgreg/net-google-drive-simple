var googleapis = require('googleapis');

var CLIENT_ID = '611902095366-rc8l88pklrh7lofmd9vrceaalkqbj5dl.apps.googleusercontent.com',
    CLIENT_SECRET = '0CbdvBVGPFKCM5VWaybD3Yrp',
    SCOPE = 'https://www.googleapis.com/auth/drive.file';

var url = require('url');
var http = require('http');
var server = http.createServer(function (req, res) {
  var url_parts = url.parse(req.url);

  if(url_parts.query.code !== "undefined"){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("OK");
    console.log("%j", url_parts.query);
    process.exit(0);
  }

 res.writeHead(400, {'Content-Type': 'text/plain'});
  res.end("ERROR");
 
}).listen(0, '127.0.0.1', function() {
  var redirect_url = 'http://localhost:' + server.address().port;
  //console.log('server running at ' + redirect_url);

    
  var auth = new googleapis.OAuth2Client(CLIENT_ID, CLIENT_SECRET, redirect_url);
  var url = auth.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPE,
  });

  console.log('next step: visit ' + url);
});


/*var auth = new googleapis.OAuth2Client();
auth.setCredentials({
  access_token: 'ya29.1.AADtN_XDvfjybDFIB5ZeGKm12BeDzDPpwOHNZNzepTFzW0Nu1PhQuQSqSWlGrlyn'
});

googleapis.discover('drive', 'v2').execute(function(err, client) {
  
  // insertion example
  client
      .drive.files.insert({ title: 'Test', mimeType: 'text/plain' })
      .withMedia('text/plain', 'Hello World')
      .withAuthClient(auth)
      .execute(function(err, result) {
        console.log('error:', err);//, 'inserted:', result.id)
      });
});
*/