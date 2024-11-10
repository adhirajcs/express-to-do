// routes/todosRoutes.js
const { Router } = require('express');
const { db } = require('../config/drizzleClient');
const { todoTable } = require('../db/todoSchema');
const { eq } = require('drizzle-orm');

const router = Router();

// Add a new todo (Create)
router.post('/add', async (req, res) => {
  const { title, description, userId } = req.body;

  // Basic validation
  if (!title || !userId) {
    return res.status(400).json({ message: 'Title and User ID are required' });
  }

  try {
    // Insert new todo into the database
    const [newTodo] = await db.insert(todoTable).values({
      title,
      description,
      userId,
    }).returning({
      id: todoTable.id,
      title: todoTable.title,
      description: todoTable.description,
      isCompleted: todoTable.isCompleted,
      userId: todoTable.userId,
      createdAt: todoTable.createdAt,
      updatedAt: todoTable.updatedAt,
    });

    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Error creating todo' });
  }
});

// Get all todos (Read)
router.get('/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Fetch todos for a user
    const todos = await db.select().from(todoTable).where(eq(todoTable.userId, userId));
    res.status(200).json({ todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Update title and description of a todo (Update)
router.put('/update-data/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title && !description) {
    return res.status(400).json({ message: 'Either title or description is required' });
  }

  try {
    // Check if the todo exists
    const [todo] = await db.select().from(todoTable).where(eq(todoTable.id, id));

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update title and description in the database
    const updatedTodo = await db.update(todoTable)
      .set({
        title: title || todo.title,
        description: description || todo.description,
        updatedAt: new Date(),
      })
      .where(eq(todoTable.id, id))
      .returning({
        id: todoTable.id,
        title: todoTable.title,
        description: todoTable.description,
        isCompleted: todoTable.isCompleted,
        userId: todoTable.userId,
        updatedAt: todoTable.updatedAt,
      });

    res.status(200).json({ message: 'Todo data updated successfully', todo: updatedTodo[0] });
  } catch (error) {
    console.error('Error updating todo data:', error);
    res.status(500).json({ message: 'Error updating todo data' });
  }
});

// Update the isCompleted status of a todo (Update)
router.put('/update-completed/:id', async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  if (isCompleted === undefined) {
    return res.status(400).json({ message: 'isCompleted status is required' });
  }

  try {
    // Check if the todo exists
    const [todo] = await db.select().from(todoTable).where(eq(todoTable.id, id));

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update isCompleted in the database
    const updatedTodo = await db.update(todoTable)
      .set({
        isCompleted,
        updatedAt: new Date(),
      })
      .where(eq(todoTable.id, id))
      .returning({
        id: todoTable.id,
        title: todoTable.title,
        description: todoTable.description,
        isCompleted: todoTable.isCompleted,
        userId: todoTable.userId,
        updatedAt: todoTable.updatedAt,
      });

    res.status(200).json({ message: 'Todo completion status updated successfully', todo: updatedTodo[0] });
  } catch (error) {
    console.error('Error updating todo completion status:', error);
    res.status(500).json({ message: 'Error updating todo completion status' });
  }
});

// Delete a todo (Delete)
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the todo exists
    const [todo] = await db.select().from(todoTable).where(eq(todoTable.id, id));

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Delete the todo
    await db.delete(todoTable).where(eq(todoTable.id, id));

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

module.exports = router;
