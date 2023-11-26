const { Router } = require("express");
const {
  AddNewFaq,
  getAllFaq,
  updateFaq,
  deleteFaq,
} = require("../controllers/faq");

const router = Router();

router.post("/", AddNewFaq);
router.get("/", getAllFaq);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

module.exports = router;
