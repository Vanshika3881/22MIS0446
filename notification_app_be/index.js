const express = require("express");
require("dotenv").config();

const Log = require("./logger");

const app = express();

app.use(express.json());

let notifications = [];

app.post("/notifications", async (req, res) => {

  await Log(
    "backend",
    "info",
    "controller",
    "Creating notification"
  );

  const notification = {
    id: notifications.length + 1,
    title: req.body.title,
    message: req.body.message,
    priority: req.body.priority || "normal",
    isRead: false
  };

  notifications.push(notification);

  res.status(201).json(notification);

});

app.get("/notifications", async (req, res) => {

  await Log(
    "backend",
    "info",
    "controller",
    "Fetching notifications"
  );

  res.json(notifications);

});

app.patch("/notifications/:id/read", async (req, res) => {

  await Log(
    "backend",
    "info",
    "controller",
    "Marking notification as read"
  );

  const notification = notifications.find(
    n => n.id == req.params.id
  );

  if (!notification) {

    return res.status(404).json({
      message: "Notification not found"
    });

  }

  notification.isRead = true;

  res.json(notification);

});

app.listen(3001, () => {
  console.log("Notification app running on port 3001");
});