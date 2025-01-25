const db = require("../data/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class Posting {
  constructor(title, content, id) {
    (this.title = title),
      (this.content = content),
      (this.id = id ? new ObjectId(id) : null);
  }

  async save(collection) {
    if (this.id) {
      await db
        .getDb()
        .collection(collection)
        .updateOne(
          { _id: this.id },
          { $set: { title: this.title, content: this.content } }
        );
    } else {
      await db
        .getDb()
        .collection(collection)
        .insertOne({ title: this.title, content: this.content });
    }
  }
  async delete(collection) {
    await db.getDb().collection(collection).deleteOne({ _id: this.id });
  }

  static async fetchall(collection) {
    const posts = await db.getDb().collection(collection).find().toArray();
    return posts;
  }

  async fetch(collection) {
    const post = await db
      .getDb()
      .collection(collection)
      .findOne({ _id: this.id });
    this.title = post.title;
    this.content = post.content;
  }
}

module.exports = Posting;
