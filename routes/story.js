const { Router } = require("express");

const router = Router();

router.post("/", addNewSeminar);
router.get("/", getAllSeminar);
router.get("/:id", getSeminarById);
router.put("/:id", updateSeminar);
router.delete("/:id", deleteSeminar);
router.put("/:id/like/:userId");
router.post("/:id/comment");
module.exports = router;
