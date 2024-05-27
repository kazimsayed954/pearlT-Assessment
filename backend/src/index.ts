import express from 'express';
import cors from 'cors';
import * as socketio from "socket.io";
import http from 'http';
import notificationRouter from './routes/notification.route';
import { configDotenv } from 'dotenv';

configDotenv();

const ioCorsOptions = {
    cors: {
      origin: "*",
    },
  };

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server,ioCorsOptions);

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/notification",notificationRouter);
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { io };
