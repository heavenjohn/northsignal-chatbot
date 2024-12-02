import { dockStart } from "@nlpjs/basic";

const dock = await dockStart({
  settings: {
    nlp: {
      forceNER: true,
      languages: ["en"],
      corpora: ["./test.json"],
    },
  },
  use: ["Basic", "BuiltinMicrosoft", "LangEn"],
});

// Register Builtins to parse dates automatically
const builtin = dock.get("builtin-microsoft");
const ner = dock.get("ner");
ner.container.register("extract-builtin-??", builtin, true);

const manager = dock.get("nlp");
await manager.train();
manager.save();
console.log(manager);
