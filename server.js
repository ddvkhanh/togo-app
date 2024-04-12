const Joi = require("joi"); //validation library
const express = require("express");
const mongoose = require("mongoose");

const Place = require("./models/place.model");

require("dotenv").config();

const app = express();

app.use(express.json());

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
    cuisine: req.body.cuisine,
    description: req.body.description,
    price: req.body.price,
    location: req.body.location,
    lastUpdatedWhen: req.body.lastUpdatedWhen,
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
          cuisine: req.body.cuisine,
          description: req.body.description,
          price: req.body.price,
          location: req.body.location,
          lastUpdatedWhen: req.body.lastUpdatedWhen,
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
    const removedPlace = await Place.deleteOne({ _id: req.params.id });
    res.send(removedPlace);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//Connect MongoDB
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.error(error));

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const path = require("path");
app.use(express.static(path.join(__dirname, "client/dist/togosApp")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/client/dist/togosApp/index.html"));
});
