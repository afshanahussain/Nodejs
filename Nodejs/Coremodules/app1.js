var path = require('path');
var websiteHome = "/Desktop//NodesFiles/index.jsp";
console.log(path.normalize(websiteHome));
console.log(path.dirname(websiteHome));
console.log(path.basename((websiteHome)));
console.log(path.extname((websiteHome)));
