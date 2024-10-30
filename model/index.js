const { MongoClient} = require("mongodb")

const andmebaas = "matkaklubi2"
const salasona = "CQ77MOwu2hYxAmGp"
const mongoUrl = `mongodb+srv://matkaklubi2:${salasona}@cluster0.hehya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 `
const client = new MongoClient(mongoUrl);

async function lisaMatk(uusMatk) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.insertOne(uusMatk)
        console.log(`A document was inserted with the _id: ${result.insertedId}`)
      } finally {
        await client.close();
      }
     
}

async function loeMatkad(uusMatk) {
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const matkad = database.collection("matkad");
        const result = await matkad.find({}).toArray()
        return result
        
      } finally {
        await client.close();
      }
     
}


module.exports = {
    lisaMatk,
    loeMatkad
}