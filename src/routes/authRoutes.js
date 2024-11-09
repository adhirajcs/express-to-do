const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { db } = require("../config/drizzleClient");
const { usersTable } = require("../db/userSchema");
const { eq } = require("drizzle-orm");

const router = Router();

// Sign-up Route
router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  // Basic validation
  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ message: "Email, username, and password are required" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert new user into the database
    const [newUser] = await db
      .insert(usersTable)
      .values({
        email,
        username,
        password: hashedPassword,
      })
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
      });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Error signing up user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Fetch user from the database by email using eq helper
    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
        password: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return user details if login is successful
    res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
});

module.exports = router;
