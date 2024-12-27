const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeNlp, processText } = require("./nlp/manager.js");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const corsConfig = {
  origin: ["http://localhost:5173"], // Do not use wildcard`
  methods: ["GET", "POST", "PUT", "DELETE"], // List only` available methods
  credentials: true, // Must be set to true
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "X-Requested-With",
    "x-xsrf-token",
    "Accept",
    "Authorization",
  ], // Allowed Headers to be received
};
app.use(cors(corsConfig));

require("./routes")(app);
app.post("/api/nlp", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await processText(text);
    console.log(text);

    res.json(response);
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({ error: "Failed to process text" });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await initializeNlp();
    console.log("NLP initialized");
  } catch (error) {
    console.error("Error initializing NLP:", error);
  }
});
