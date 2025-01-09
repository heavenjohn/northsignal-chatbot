const { dockStart } = require("@nlpjs/basic");
const fs = require("fs");

let nlpManager; // To store the NLP Manager instance

const initializeNlp = async () => {
  const dock = await dockStart({
    settings: {
      nlp: {
        forceNER: true, // Enable Named Entity Recognition
        languages: ["en"], // Supported languages
        corpora: ["./nlp/corpus.json"], // Path to your corpus file
      },
    },
    use: ["Basic", "BuiltinMicrosoft", "LangEn"], // Plugins
  });

  const manager = dock.get("nlp");

  // Function to reload corpus
  async function reloadCorpus() {
    console.log("Reloading corpus...");

    console.log("Corpus reloaded and NLP retrained.");
  }

  // Example: Add a mechanism to trigger corpus reload
  // For instance, you can watch for file changes
  fs.watch("./nlp/corpus.json", async eventType => {
    if (eventType === "change") {
      await reloadCorpus();
    }
  });
  await manager.train(); // Train the NLP model
  console.log("NLP model trained successfully");
  nlpManager = manager; // Save the manager instance for later use
};
const retrained = async () => {
  const corpusData = JSON.parse(fs.readFileSync("./nlp/corpus.json", "utf-8"));
  console.log(nlpManager.settings.container.configurations);
  nlpManager.settings.container.configurations.nlp.corpora = corpusData;

  await nlpManager.train();
};

const processText = async text => {
  if (!nlpManager) {
    throw new Error("NLP Manager is not initialized");
  }
  return await nlpManager.process("en", text);
};

module.exports = { initializeNlp, processText, retrained };
