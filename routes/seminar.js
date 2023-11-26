const { Router } = require("express");
const {
  addNewSeminar,
  getSeminarById,
  getAllSeminar,
  updateSeminar,
  deleteSeminar,
} = require("../controllers/pamflet");

const router = Router();

router.post("/", addNewSeminar);
router.get("/", getAllSeminar);
router.get("/:id", getSeminarById);
router.put("/:id", updateSeminar);
router.delete("/:id", deleteSeminar);

module.exports = router;
