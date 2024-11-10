const { pgTable, integer, varchar, boolean, timestamp } = require("drizzle-orm/pg-core");
const { usersTable } = require("./userSchema");

const todoTable = pgTable('todos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 500 }),
  isCompleted: boolean().default(false).notNull(),
  userId: integer().references(() => usersTable.id).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

module.exports = { todoTable };
