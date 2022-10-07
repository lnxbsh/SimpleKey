const _sodium =  require('libsodium-wrappers');
var fs = require("fs");

(async() => {
  await _sodium.ready;
  const sodium = _sodium;

  const kepairs = sodium.crypto_box_keypair();
  
fs.writeFile("temp.txt", new Buffer.from(kepairs.privateKey).toString(), (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
    var string = new TextDecoder().decode(kepairs.privateKey)
    console.log(string)
});
  

})();