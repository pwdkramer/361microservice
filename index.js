const express = require('express');
const massive = require('massive');
const app = express();
const PORT = 8080;

app.use(express.json());


massive({
  connectionString: 'postgres://gzyyntke:4K3jM56JjCWlt81V0lfIqLJC8ie_peHQ@kashin.db.elephantsql.com/gzyyntke',
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db);
  console.log('Database Connected');
}).catch(err => console.log(err));

app.post("/createLevel", async (req, res) => {
  const {uuid, image64} = req.body;

  //console.log(uuid, image64);

  const db = req.app.get('db');

  await db.read([uuid])
    .then(response => {
      console.log(response[0]);
      if (response[0]) {
        return res.status(409).send('Level with specified uuid already exists!')
      }
      else {
        db.create([uuid, image64])
        .then(response => {
          return res.status(201).send('Level created!')
        }).catch(err => res.status(500).send(err));
      }
    }).catch(err => res.status(500).send(err));
})

app.get("/readLevel", async (req, res) => {
  const {uuid} = req.body;
  const db = req.app.get('db');

  await db.read([uuid])
    .then(response => {
      console.log(response[0]);
      if (response[0]) {
        return res.status(200).send(response[0].image64)
      }
      else {
        return res.status(404).send('Level with specified uuid not found!')
      }
    }).catch(err => res.status(500).send(err));
})


app.post("/updateLevel", async (req, res) => {
  const {uuid, image64} = req.body;
  const db = req.app.get('db');

  await db.read([uuid])
  .then(response => {
    console.log(response[0]);
    if (response[0]) {
      db.update([uuid, image64])
      .then(response => {
        return res.status(201).send('Level updated!')
      }).catch(err => res.status(500).send(err));
    }
    else {
      return res.status(409).send('Level with specified uuid not found!')
    }
  }).catch(err => res.status(500).send(err));
})


app.post("/deleteLevel", async (req, res) => {
  const {uuid} = req.body;
  const db = req.app.get('db');

  await db.read([uuid])
  .then(response => {
    console.log(response[0]);
    if (response[0]) {
      db.remove([uuid])
      .then(response => {
        return res.status(201).send('Level deleted!')
      }).catch(err => res.status(500).send(err));
    }
    else {
      return res.status(409).send('Level with specified uuid not found!')
    }
  }).catch(err => res.status(500).send(err));
})


app.listen(
    PORT,
    () => console.log(`live on http://localhost:${PORT}`)
);