import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import errHandle from "./middlewares/errHandle.js";
import notFound from "./middlewares/notFound.js";
import { createServer } from "node:http";
import inintSocket from "./sockets/index.js";


const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const server = createServer(app);

app.use("/auth", authRoute);


inintSocket(server)

app.use(notFound);
app.use(errHandle);


server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
