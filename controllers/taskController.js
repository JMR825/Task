const Task = require('../models/Task');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const task = new Task({
      title: req.body.title,
      completed: req.body.completed || false,
      user: req.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      updates,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

