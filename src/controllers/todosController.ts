import { Request, Response } from "express";
import db from "../config/drizzleClient";
import { todos } from "../models/todoSchema";

// Controller to fetch all todos
export const fetchTodos = async (req: Request, res: Response) => {
  try {
    const allTodos = await db.select().from(todos);
    res.status(200).json(allTodos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Controller to insert a new todo
export const insertTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const newTodo = {
      title: req.body.title,
      userId: req.body.userId, // Ensure userId is provided in the request body
      description: req.body.description || null,
      isCompleted: req.body.isCompleted || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(todos).values(newTodo);
    res.status(201).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    console.error("Error inserting todo:", error);
    res.status(500).json({ error: "Failed to add todo" });
  }
};
