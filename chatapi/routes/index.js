module.exports = app => {
  // List of available Routes
  app.use("/corpus", require("./Corpus"));
};
