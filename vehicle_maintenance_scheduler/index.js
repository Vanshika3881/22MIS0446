const express = require("express");
const axios = require("axios");
require("dotenv").config();

const Log = require("./logger");
const optimizeTasks = require("./scheduler");

const app = express();

app.use(express.json());

const headers = {
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
};

app.get("/schedule", async (req, res) => {

  try {

    await Log(
      "backend",
      "info",
      "route",
      "Schedule API called"
    );

    const depotResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/depots",
      { headers }
    );

    const vehicleResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/vehicles",
      { headers }
    );

    const depots = depotResponse.data.depots;
    const vehicles = vehicleResponse.data.vehicles;

    const results = depots.map((depot) => {

      const optimized = optimizeTasks(
        vehicles,
        depot.MechanicHours
      );

      return {
        depotID: depot.ID,
        mechanicHours: depot.MechanicHours,
        totalImpact: optimized.totalImpact,
        selectedTasks: optimized.selectedTasks
      };

    });

    await Log(
      "backend",
      "info",
      "service",
      "Schedule optimization completed"
    );

    res.json(results);

  } catch (error) {

    await Log(
      "backend",
      "error",
      "service",
      "Schedule optimization failed"
    );

    res.status(500).json({
      error: error.message
    });

  }

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});