const express = require("express");
const router = express.Router();
const {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract,
} = require("../controllers/contractController");


// /api/contracts
router.post("/", createContract);
router.get("/", getContracts);
router.get("/:id", getContractById);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);


module.exports = router;