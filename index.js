const express = require('express')
const bodyParser = require('body-parser');
const cors = require ('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const port = 4000
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rpvut.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)

client.connect(err => {

  console.log("err connecting", err)
  const eventCollection = client.db("dichokro").collection("events");
  const reviewCollection = client.db("dichokro").collection("review");
  const adminCollection = client.db("dichokro").collection("admins");
  const orderCollection = client.db("dichokro").collection("order");

  app.get("/events", (req, res) => {
    eventCollection.find()
      .toArray((err, items) => {
        // console.log("from data base", items)
        res.send(items)
      })

  })

  app.post("/addEvents", (req, res) => {
    const newEvent = req.body;
    console.log("add new event", newEvent);
    eventCollection.insertOne(newEvent)
      .then(result => {
        console.log("inserted count", result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })


  app.get("/review", (req, res) => {
    reviewCollection.find()
      .toArray((err, items) => {
        // console.log("from data base", items)
        res.send(items)
      })

  })

  app.post("/addReview", (req, res) => {
    const newEvent = req.body;
    console.log("add new event", newEvent);
    reviewCollection.insertOne(newEvent)
      .then(result => {
        console.log("inserted count", result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })

  // admin
  app.get("/admin", (req, res) => {
    adminCollection.find()
      .toArray((err, items) => {
        // console.log("from data base", items)
        res.send(items)
      })

  })

  app.post("/addAdmin", (req, res) => {
    const newEvent = req.body;
    console.log("add new event", newEvent);
    adminCollection.insertOne(newEvent)
      .then(result => {
        console.log("inserted count", result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })

  
  // order
  app.get("/order", (req, res) => {
    // console.log(req.query.email)
    orderCollection.find({email: req.query.email})
      .toArray((err, items) => {
        res.send(items)
      })

  })

  

  app.post("/addOrder", (req, res) => {
    const newEvent = req.body;
    console.log("add new event", newEvent);
    orderCollection.insertOne(newEvent)
      .then(result => {
        console.log("inserted count", result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })




  app.post('/isAdmin', (req, res) => {
    const email = req.body.email;
    adminCollection.find({ email: email })
      .toArray((err, admin) => {
        res.send(admin.length > 0)
      })
  })
  

  app.get("/allOrder", (req, res) => {
    // console.log(req.query.email)
    orderCollection.find({})
      .toArray((err, items) => {
        res.send(items)
      })

  })

  //   client.close();
});
app.listen(process.env.PORT || port)