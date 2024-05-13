import express from "express";
import cors from "cors";
import connectDatabase from "./config/db.js";
import api from "./routes/api.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/",api );
// app.get("/", (req, res) => {
//   res.send("Hello Recipe Website");
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
connectDatabase();
