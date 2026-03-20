import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import errHandle from "./middlewares/errHandle.js";
import notFound from "./middlewares/notFound.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);

app.use(notFound);
app.use(errHandle);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
