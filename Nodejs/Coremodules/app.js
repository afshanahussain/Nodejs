var fs = require('fs');
fs.writeFileSync("/Users/afshanahussain/Desktop/NodeFiles/Coremodules/corn.txt", "I am corny and cute");
console.log(fs.readFileSync("/Users/afshanahussain/Desktop/NodeFiles/Coremodules/corn.txt").toString());
