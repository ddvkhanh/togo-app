const Joi = require("joi"); //validation library
const express = require("express");
const mongoose = require("mongoose");

const Place = require("./models/place.model");

require("dotenv").config();

const app = express();

app.use(express.json());

// const TODOS = [
//   {
//     id: 1,
//     isVisited: false,
//     name: "Daylesford Lake",
//     category: "Daytrip",
//     description: "Pretty in autumn",
//     location: "Daylesford",
//   },
//   {
//     id: 2,
//     isVisited: false,
//     name: "Universal Restaurant",
//     category: "Restaurant",
//     description: "Best value chicken parma	",
//     location: "Carlton - CBD",
//   },
//   {
//     id: 3,
//     isVisited: false,
//     name: "Wilson Prom",
//     category: "Daytrip",
//     description: "Camping with wombats",
//     location: "Wilson Prom",
//   },
//   {
//     id: 4,
//     isVisited: false,
//     name: "Ribs and Burger",
//     category: "Restaurant",
//     description: "Best thickshakes and ribs",
//     location: "Hawthorn",
//   },
// ];

//GET all places
app.get("/api/togo", async (req, res) => {
  try {
    const places = await Place.find();
    res.send(places);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//GET place by ID
app.get("/api/togo/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    res.send(place);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//CREATE new place
app.post("/api/togo", async (req, res) => {
  const place = new Place({
    isVisited: req.body.isVisited,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    location: req.body.location,
  });

  try {
    const savedPlace = await place.save();
    res.send(savedPlace);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//UPDATE existing place
app.put("/api/togo/:id", async (req, res) => {
  try {
    const updatedPlace = await Place.updateOne(
      { _id: req.params.id },
      {
        $set: {
          isVisited: req.body.isVisited,
          name: req.body.name,
          category: req.body.category,
          description: req.body.description,
          location: req.body.location,
        },
      }
    );
    console.log(updatedPlace);
    res.send(updatedPlace);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//DELETE existing place
app.delete("/api/togo/:id", async (req, res) => {
  try {
    const removedPlace = await Place.remove({ _id: req.params.id });
    res.send(removedPlace);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//Connect MongoDB
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (req, res) => {}
);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));