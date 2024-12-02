const { dockStart } = require("@nlpjs/basic");

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
  await manager.train(); // Train the NLP model
  console.log("NLP model trained successfully");
  nlpManager = manager; // Save the manager instance for later use
};

const processText = async text => {
  if (!nlpManager) {
    throw new Error("NLP Manager is not initialized");
  }
  return await nlpManager.process("en", text);
};

module.exports = { initializeNlp, processText };
