import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool(process.env.DATABASE_URL);

async function viewLogins() {
  try {
    const [rows] = await pool.query("SELECT * FROM logins ORDER BY created_at DESC");
    
    if (rows.length === 0) {
      console.log("\n--- No records found in 'logins' table ---\n");
    } else {
      console.log("\n--- Current Records in 'logins' Table ---\n");
      console.table(rows);
    }
  } catch (err) {
    console.error("Error fetching records:", err);
  } finally {
    pool.end();
  }
}

viewLogins();
