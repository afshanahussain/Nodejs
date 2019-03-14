var http = require('http');
var fs = require('fs');

function send404response(response) {
  response.writeHead(404,{"Context-Type":"text/plain"});
  response.write("Resource not found");
  response.end();

}

function onRequest(request,response){
  if(request.url =='/index.html' && request.method == 'GET')
  {
  response.writeHead(200,{"Context-Type":"text/plain"});
  fs.createReadStream("/Users/afshanahussain/Desktop/NodeFiles/SimpleWebServer/index.html").pipe(response);

  }
  else{
    send404response(response) ;
  }
  console.log("user made a request :" + request.url);

}
http.createServer(onRequest).listen(8888);
console.log("server is now running...");
