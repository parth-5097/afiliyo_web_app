const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const options = {
  key: fs.readFileSync("server_cred/key.pem"),
  cert: fs.readFileSync("server_cred/cert.pem"),
};

const app = express();

const { requireSignin, removeNull } = require("./middleware/middleware");

// routes
const userRoutes = require("./routes/user");
const userNameRoutes = require("./routes/usernameRoute");
const adminRoutes = require("./routes/admin");
const commonRoutes = require("./routes/commonRoute");
const { PORT, IMG, SQL } = require("./config");
const connection = require("./database/connect");

let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

//NOTE:middleWare
app.use(cors());
app.use(express.urlencoded({ limit: `${IMG.size}`, extended: true }));
app.use(express.json({ limit: `${IMG.size}` }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());

//NOTE:specific route calling
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

//NOTE:common route calling
app.use("/api", commonRoutes);

//NOTE: After login routes
app.use("/username", requireSignin, removeNull, userNameRoutes);

app.get("/", (req, res) => {
  res.render(" product/product");
});

app.get("/:sortId", (req, res) => {
  connection.query(
    `SELECT link,timestamp FROM ${SQL.tables.transactional.sort_link} WHERE sort_id="${req.params.sortId}"`,
    (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: "Something went wrong",
        });
      } else if (data.length === 0) {
        res.json({
          success: false,
          message: "Check your url, this may be expired or spelled incorrectly",
        });
      } else {
        res.redirect(data[0].link);
      }
    }
  );
});

app.get("/socket.io.js", (req, res, next) => {
  return res.sendFile(`node_modules/socket.io-client/dist/socket.io.js`);
});

app.get("/socket.io-file-client.js", (req, res, next) => {
  return res.sendFile(
    `node_modules/socket.io-file-client/socket.io-file-client.js`
  );
});

const port = PORT.livePort || 5000;

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const server = app.listen(port, () =>
    console.log(`Server started at:${port}`)
  );
  // const server = https
  //   .createServer(options, app)
  //   .listen(port, () => console.log(`Server started at: ${port}`));
  const io = require("socket.io")(server);
  require("./routes/socket")(io);

  console.log(`Worker ${process.pid} started`);
}
