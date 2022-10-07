const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require("mongodb");
var sodium = require('sodium-native');
var fs = require("fs");



app = express()
const uri =
    "mongodb+srv://saumi:nimbus@assignmentdb.m7n4dyr.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/SignUp.html');
})

app.post('/', (req, res) => {
    keypairs = signingKeypair();
    user = { username: req.body.username, password: req.body.password, email: req.body.email, pubkey: keypairs.publicKey }
    createUser(client, user)
    // res.send("save this " + new Buffer.from(keypairs.secretKey)).toString();
   //const file = `$(kepairs.secertKey)`;
    
    fs.writeFile("temp.txt", new Buffer.from(keypairs.secretKey).toString(), (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
        console.log( new Buffer.from(keypairs.secretKey))
    });
    res.download(__dirname + "/temp.txt");
})



app.get('/verify', (req, res) => {
    res.sendFile(__dirname + "/verify.html")
})

app.post('/verify',(req,res) => {
    findUser(client,req.body.username,req.header['X-Signature'])
})

app.listen(8000)








async function createUser(client, user) {
    const result = await client.db("assignmentDB").collection("Users").insertOne(user);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function findUser(client,username, privatekey){
    const result =  await client.db("assignmentDB").collection("Users").findOne(username);
    console.log("Username found");
    sodium.sodium_compare(result.publicKey, privatekey);
}

function signingKeypair() {
    const keypair = {
        publicKey: sodium.sodium_malloc(sodium.crypto_sign_PUBLICKEYBYTES),
        secretKey: sodium.sodium_malloc(sodium.crypto_sign_SECRETKEYBYTES)
    }
    sodium.crypto_sign_keypair(keypair.publicKey, keypair.secretKey)
    return keypair
}
