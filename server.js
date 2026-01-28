import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/cozinha", async (req, res) => {
  const result = await pool.query("SELECT * FROM cozinha ORDER BY prato");
  res.json(result.rows);
});

