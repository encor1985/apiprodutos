import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

/* =======================
   LISTAR TODOS
======================= */
app.get("/cozinha", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM cozinha ORDER BY prato"
  );
  res.json(result.rows);
});

/* =======================
   BUSCAR POR NOME
======================= */
app.get("/cozinha/buscar", async (req, res) => {
  const { prato } = req.query;

  const result = await pool.query(
    "SELECT * FROM cozinha WHERE prato ILIKE $1 ORDER BY prato",
    [`%${prato}%`]
  );

  res.json(result.rows);
});

/* =======================
   CADASTRAR
======================= */
app.post("/cozinha", async (req, res) => {
  const { prato, quantidade } = req.body;

  await pool.query(
    "INSERT INTO cozinha (prato, quantidade) VALUES ($1, $2)",
    [prato, quantidade]
  );

  res.json({ message: "Prato cadastrado com sucesso" });
});

/* =======================
   EDITAR
======================= */
app.put("/cozinha/:id", async (req, res) => {
  const { id } = req.params;
  const { prato, quantidade } = req.body;

  await pool.query(
    "UPDATE cozinha SET prato = $1, quantidade = $2 WHERE id = $3",
    [prato, quantidade, id]
  );

  res.json({ message: "Prato atualizado com sucesso" });
});

/* =======================
   EXCLUIR
======================= */
app.delete("/cozinha/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM cozinha WHERE id = $1",
    [id]
  );

  res.json({ message: "Prato excluído com sucesso" });
});

/* =======================
   SERVIDOR
======================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});

