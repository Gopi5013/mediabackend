
require("dotenv").config({
  path: "./.env",
});



const express = require("express");
const cors = require("cors");

const paymentRoutes = require("./routes/payment");
const verifyRoutes = require("./routes/verify");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.mediaproblem.in",
      "https://mediaproblem.in",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "MediaProblem Payment Backend Running"
  );
});

app.use("/api", paymentRoutes);
app.use("/api", verifyRoutes);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});
