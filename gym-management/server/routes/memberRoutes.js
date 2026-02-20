const express = require('express');
const router = express.Router();

const {
    createMember,
    getMembers,
    updateMember,
    deleteMember
} = require("../controllers/memberController");

// create member
router.post("/", createMember);

//get all members
router.get("/", getMembers);

//update member
router.put("/:id", updateMember);

//delete member
router.delete("/:id", deleteMember);

module.exports = router;