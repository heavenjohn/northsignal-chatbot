const router = require("express").Router(),
  {
    browse,
    update,
    create,
    destoy,
    restart,
  } = require("../controllers/Corpus");

router
  .get("/", browse)
  .put("/update", update)
  .post("/create", create)
  .post("/restart", restart)
  .delete("/delete", destoy);

module.exports = router;
