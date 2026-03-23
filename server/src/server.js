import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import errHandle from "./middlewares/errHandle.js";
import notFound from "./middlewares/notFound.js";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

app.use("/auth", authRoute);

app.use(notFound);
app.use(errHandle);

io.on("connection", (socket) => {
  socket.on("hello", (arg) => {
    console.log(arg); // world
  });
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
