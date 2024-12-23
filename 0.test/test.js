const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  const database = client.db("firstDB");
  const users = database.collection("users"); //collection은 테이블이다.

  const userData = await users.insertOne({ name: "nicewjdqls", age: 32 });
  console.log("result", userData);
}
run();
