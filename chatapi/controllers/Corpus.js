const fs = require("fs");
const { initializeNlp, retrained } = require("../nlp/manager");
const { log } = require("console");
const filePath = "./nlp/corpus.json";

exports.browse = (req, res) =>
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const jsonData = JSON.parse(data);
    res.json({
      success: "Corpus Fetched Successfully",
      payload: jsonData.data,
    });
  });
// create add edit delete on corpus
exports.create = (req, res) => {
  const { model } = req.body;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const jsonData = JSON.parse(data);
    let _model = { ...model, id: jsonData.data.length + 1 };
    jsonData.data.push(_model);
    fs.writeFile(filePath, JSON.stringify(jsonData), async err => {
      if (err) {
        console.error(err);
        return;
      }

      res.json({
        success: "Data added successfully",
        payload: jsonData.data,
      });
    });
  });
};
exports.update = (req, res) => {
  const { model, id } = req.body;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const jsonData = JSON.parse(data);
    const index = jsonData.data.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Data not found" });
    }
    jsonData.data[index] = model;
    fs.writeFile(filePath, JSON.stringify(jsonData), async err => {
      if (err) {
        console.error(err);
        return;
      }

      res.json({
        success: "Data updated successfully",
        payload: jsonData.data,
      });
    });
  });
};
exports.restart = async (req, res) => {
  // await initializeNlp();
  await retrained();
  res.json({ success: "NLP restarted" });
};
exports.destoy = (req, res) => {
  const { id } = req.body;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const jsonData = JSON.parse(data);
    const index = jsonData.data.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Data not found" });
    }
    jsonData.data.splice(index, 1);
    fs.writeFile(filePath, JSON.stringify(jsonData), async err => {
      if (err) {
        console.error(err);
        return;
      }

      res.json({
        success: "Data deleted successfully",
        payload: jsonData.data,
      });
    });
  });
};
