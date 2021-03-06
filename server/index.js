"use strict";
const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = "mongodb://localhost:27017/tweeter";

//Connects to the Mongo database for storing tweet information

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error('Failed to connect: ${MONGODB_URI}');
    throw err;
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static("public"));

  // The in-memory database of tweets. It's a basic object with an array in it.
  // const db = require("./lib/in-memory-db");


  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  // app.user("/likes", tweetLikes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});