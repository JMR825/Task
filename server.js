require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(errorMiddleware);

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => console.error(err));
