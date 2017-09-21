"use strict";

const MongoClient = require("mongodb").MongoClient;
//const {MongoClient} = require("mongodb");
// ^^^ Same thing as above ^^^
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Refactored and wrapped as new, tweet-specific function:

  db.collection("tweets").find().toArray((error, tweets) => {

    console.log(tweets);

  });


  function getTweets(callback) {
    db.collection("tweets").find().toArray((error, anything) => {
      if (error) {
        return callback(error);
      }
      callback(null, anything);
    });
  }

  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  getTweets((err, tweets) => {
    if (err) throw err;

    const data = {
      tweets: tweets
    };

    db.close();
  });

});