const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../Middleware/authentication");

const {
  createTask,
  getTasksByListId,
  completedTask,
  transferTask,
} = require("../Controllers/taskController");

router.route("/").post(authenticateUser, createTask);
router.route("/").patch(authenticateUser, transferTask);
router.route("/:listId").get(authenticateUser, getTasksByListId);
router.route("/:listId/:taskId").patch(authenticateUser, completedTask);


module.exports = router;
