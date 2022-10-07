const { MongoClient } = require("mongodb");


const uri =
  "mongodb+srv://saumi:nimbus@assignmentdb.m7n4dyr.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);


async function createUser(client, user){
    const result = await client.db("assignmentDB").collection("Users").insertOne(user);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
createUser(client,
    {
        username: "Doe",
        password: 123
    }
);

var sodium = require('sodium-native');

var ed25519KeyPair = signingKeypair()

function signingKeypair () {
    const keypair = {
        publicKey: sodium.sodium_malloc(sodium.crypto_sign_PUBLICKEYBYTES),
        secretKey: sodium.sodium_malloc(sodium.crypto_sign_SECRETKEYBYTES)
    }
    sodium.crypto_sign_keypair(keypair.publicKey, keypair.secretKey)
    return keypair
}


