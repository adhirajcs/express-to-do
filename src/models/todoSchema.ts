import { pgTable, integer, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "./userSchema";

export const todos = pgTable('todos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 500 }),
  isCompleted: boolean().default(false).notNull(),
  userId: integer().references(() => users.id).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});
