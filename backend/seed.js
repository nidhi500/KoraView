const mongoose = require("mongoose");
const Monastery = require("./models/Monastery");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

const monasteries = [
  {
    name: "Rumtek Monastery",
    latitude: 27.3309,
    longitude: 88.5182,
    thumbnail: "/assets/images/rumtek.jpg",
    panorama: "/assets/panoramas/rumtek360.jpg",
    description: "Rumtek Monastery in Sikkim."
  },
  {
    name: "Tashiding Monastery",
    latitude: 27.3144,
    longitude: 88.2743,
    thumbnail: "/assets/images/tashiding.jpg",
    panorama: "/assets/panoramas/tashiding360.jpg",
    description: "Tashiding Monastery in Sikkim."
  }
];

Monastery.insertMany(monasteries)
  .then(() => {
    console.log("Seed data inserted");
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
