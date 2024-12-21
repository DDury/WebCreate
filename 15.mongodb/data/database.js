const mongodb = require("mongodb");

const mongoclient = mongodb.MongoClient;

let database;

async function connect() {
  const client = await mongoclient.connect("mongodb://localhost:27017");
  database = client.db("blog");
}

function getdb() {
  if (!database) {
    throw { message: "DB connection not established" };
  }
  return database;
}

module.exports = {
  connectdb: connect,
  getdb: getdb,
};
