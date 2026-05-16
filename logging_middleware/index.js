const express = require("express");
const Log = require("./logger");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {

  await Log(
    "backend",
    "info",
    "route",
    "Root route accessed successfully"
  );

  res.status(200).json({
    success: true,
    message: "Logging middleware working successfully"
  });
});

app.get("/health", async (req, res) => {

  await Log(
    "backend",
    "debug",
    "service",
    "Health check endpoint triggered"
  );

  res.status(200).json({
    status: "OK"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});