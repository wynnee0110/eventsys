const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory events store
let events = [];

// GET all events
app.get("/events", (req, res) => {
  res.json(events);
});

// POST create event
app.post("/events", (req, res) => {
  const { name, date } = req.body;

  if (!name || !date) {
    return res.status(400).json({ error: "Name and date are required" });
  }

  const newEvent = {
    id: events.length + 1,
    name,
    date,
  };

  events.push(newEvent);

  res.json(newEvent);
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
