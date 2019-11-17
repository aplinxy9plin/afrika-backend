const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const { PORT, URL, DB_NAME } = require("./config");
const schema = require("./schema.js")
const bodyParser = require("body-parser")

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

app.post("/reg", (req, res) => {
  MongoClient.connect(URL, (err, db) => {
    if(err) throw err;
    var dbo = db.db(DB_NAME);
    dbo.collection("users").insertOne(schema.user, (err, result) => {
      if(err) throw err;
      if(result){
        res.json({
          "type": "ok",
          "_id": result["ops"][0]["_id"]
        })
      }else{
        res.status(500);
        res.json({
          "type": "err"
        });
      }
    })
  })
})

app.post("/create", (req, res) => {
  MongoClient.connect(URL, (err, db) => {
    if(err) throw err;
    var dbo = db.db(DB_NAME);
    dbo.collection("posts").insertOne(
      {
        "owner": req.body.owner,
        "text": req.body.text,
        "position": {
            "lat": req.body.position.lat,
            "lng": req.body.position.lng
        },
        "photo": req.body.photo,
        "time": new Date()
      }
      , (err, result) => {
      if(err) throw err;
      if(result){
        res.json({
          "type": "ok",
          "_id": result["ops"][0]["_id"]
        })
      }else{
        res.status(500);
        res.json({
          "type": "err"
        });
      }
    })
  })
})

app.get("/", (req, res) => {
  MongoClient.connect(URL, (err, db) => {
    if(err) throw err;
    var dbo = db.db(DB_NAME)
    dbo.collection("posts").find({}).toArray((err, result) => {
      if(err) throw err;
      if(result){
        res.json({
          type: "ok",
          result
        })
      }else{
        res.status(500);
        res.json({type: "bad", result})
      }
    })
  })
})

app.listen(PORT, () => {
  console.log("Server listening on port", PORT)
})