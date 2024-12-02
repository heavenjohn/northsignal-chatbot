const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeNlp, processText } = require("./nlp/manager.js");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

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
