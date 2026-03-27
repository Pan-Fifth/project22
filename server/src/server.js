import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import errHandle from "./middlewares/errHandle.js";
import notFound from "./middlewares/notFound.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.use("/auth", authRoute);

app.use(notFound);
app.use(errHandle);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log(`${socket.id} is disconnected`);
  });
  socket.on("message", (msg) => {
    io.emit("message", {
      text: msg,
      userId: socket.id,
    });
  });
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
