const db = require("../Models");
const Task = db.tasks;
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createTask = async (req, res) => {
  const { listId, description } = req.body;

  if (!listId || !description) {
    throw new CustomError.BadRequestError("Please provide all values!");
  }

  const task = await Task.create({ listId, description });

  res.status(StatusCodes.CREATED).json({ task });
};

const getTasksByListId = async (req, res) => {
  const listId = req.params.listId;
  const tasks = await Task.findAll({
    where: { listId, completed: false },
  });
  res.status(StatusCodes.OK).json({ tasks });
};

const completedTask = async (req, res) => {
  const taskId = req.params.taskId;
  const listId = req.params.listId;
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new CustomError.BadRequestError("Task not found!");
  }

  task.completed = true;
  await task.save();

  const tasks = await Task.findAll({
    where: { listId, completed: false },
  });
  res.status(StatusCodes.OK).json({ tasks });
};

const transferTask = async (req, res) => {
  const { taskId, newListId } = req.body;
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new CustomError.BadRequestError("Task not found!");
  }

  task.listId = newListId;
  await task.save();

  res.status(StatusCodes.OK).json({ message: 'Task transferred successfully' });
};

module.exports = {
  createTask,
  getTasksByListId,
  completedTask,
  transferTask
};
