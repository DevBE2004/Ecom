const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      // await mongoose
      //   .connect("mongodb://127.0.0.1:27017/" + process.env.MONGODB_NAME)
      .then(console.log("Connected to MongoDB"))
      .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
      });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

module.exports = dbConnect;
