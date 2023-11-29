const { Router } = require("express");
const {
  addNewSeminar,
  getSeminarById,
  getAllSeminar,
  updateSeminar,
  deleteSeminar,
} = require("../controllers/pamflet.controller");
const uploads = require("../middlewares/multer");

const router = Router();

router.post("/", uploads.single("pamflet"), addNewSeminar);
router.get("/", getAllSeminar);
router.get("/:id", getSeminarById);
router.put("/:id", uploads.single("pamflet"), updateSeminar);
router.delete("/:id", deleteSeminar);

module.exports = router;
