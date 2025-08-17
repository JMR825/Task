const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middleware/validationMiddleware');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth middleware to every route
router.use(auth);

// Define routes with validation and handlers
router.post(
  '/',
  body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  validate,
  createTask
);

router.get('/', getTasks);

router.get(
  '/:id',
  param('id').isMongoId().withMessage('Invalid task ID'),
  validate,
  getTask
);

router.patch(
  '/:id',
  param('id').isMongoId().withMessage('Invalid task ID'),
  body('title').optional().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
  validate,
  updateTask
);

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('Invalid task ID'),
  validate,
  deleteTask
);

module.exports = router;
