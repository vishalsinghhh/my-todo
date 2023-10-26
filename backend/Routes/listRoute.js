const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../Middleware/authentication");

const {createList, getAllLists} = require("../Controllers/listController")

router.route("/").post(authenticateUser, createList);
router.route("/").get(authenticateUser, getAllLists);

module.exports = router;