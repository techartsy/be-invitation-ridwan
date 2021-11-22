const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./src/routes");
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/invitation", router);
// app.get("/", (err, res) => {
//   res.send("Server Connected");
// });

app.listen(port, () => console.log(`Your server running on ${port}`));
